/**
 * @module natron-args-parser
 */
import {splitAtEq, assignToArgs} from "./helper";

export class ArgsParser {

  options: Object;
  flags: Map<string, Object>;

  constructor(options?: Object) {
    this.options = Object.assign({}, options);
    this.flags = new Map();

    if (this.options.flags) {
      let flags = this.options.flags;

      for (let name of Object.keys(flags)) {
        let flag = Object.assign({name}, flags[name]);
        this.flags.set(name, flag);

        if (flag.alias) {
          if (flag.alias instanceof Array) {
            for (let alias of flag.alias) {
              this.flags.set(alias, flag);
            }
          } else {
            this.flags.set(flag.alias, flag);
          }
        }
      }
    }
  }

  parse(argv: Array<String>): Object {
    let args = {"_": []};

    for (let p = {i: 0, argv}; p.i < argv.length; p.i++) {
      let arg = argv[p.i];

      if (p.stop) {
        if (args["--"]) {
          args["--"].push(arg);
        } else {
          args["_"].push(arg);
        }
      } else if (arg === "--") {
        this.stopParsing(args, p);
      } else if (arg[0] === "-") {
        this.parseFlag(arg, args, p);
      } else {
        let stopEarly = this.options.stopEarly;
        if (stopEarly === true || stopEarly === args["_"].length) {
          this.stopParsing(args, p);
          p.i--;
        } else {
          this.parseArg(arg, args);
        }
      }
    }
    return args;
  }

  stopParsing(args: Object, p: Object): void {
    if (this.options["--"]) {
      args["--"] = [];
    }
    p.stop = true;
  }

  parseFlag(arg: string, args: Object, p: Object): void {
    let [flag, value] = splitAtEq(arg.replace(/^[-]+/, ""));

    if (arg[1] !== "-" && flag.length > 1) {
      value = value || true;
      for (let f of flag.split("")) {
        let info_ = this.getFlagInfo(f);
        assignToArgs(args, info_ || f, value);
      }
      return;
    }

    let type = this.options.greedy;
    if ((/^no-/).test(flag)) {
      flag = flag.slice(3);
      type = "false";
    }

    let info = this.getFlagInfo(flag);
    if (!info && this.options.onUnknownFlag) {
      info = this.options.onUnknownFlag(flag, value, args);
      if (info === false) {
        info = {name: flag, ignore: true};
      }
    }
    if (info) {
      flag = info;
      if (typeof type !== "string") {
        type = info.type || type;
      }
    }

    if (type === "boolean") {
      value = value || true;
    } else if (type === "false") {
      value = false;
    } else if (!value && type) {
      let next = p.argv[p.i + 1];
      if (!(/^-/).test(next)) {
        value = next;
        p.i++;
      }
    }
    assignToArgs(args, info || flag, value);
  }

  parseArg(arg: string, args: Object): void {
    if (this.options.onArg) {
      let arg_ = this.options.onArg(arg, args);
      if (arg_ !== undefined) {
        arg = arg_;
      }
    }
    if (arg) {
      args["_"].push(arg);
    }
  }

  getFlagInfo(name: string): Object {
    return this.flags.get(name);
  }
}

export function parse(argv: Array<string>, options?: Object): Object {
  if (typeof argv === "object" && !(argv instanceof Array)) {
    [argv, options] = [process.argv.slice(2), argv];
  }
  let parser = new ArgsParser(options);
  return parser.parse(argv);
}
