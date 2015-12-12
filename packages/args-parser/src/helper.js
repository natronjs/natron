/**
 * @module natron-args-parser
 */

export function splitAtEq(chunk: string): Array {
  let m = chunk.match(/^([^=]+)=([\s\S]*)$/);
  return m ? [m[1], m[2]] : [chunk];
}

export function normalize(value: string): any {
  if (typeof value === "string") {
    let value_ = value.trim().toLowerCase();
    if (value_ === "true") {
      return true;
    }
    if (value_ === "false") {
      return false;
    }
    if (value_ === "null") {
      return null;
    }
    /*eslint-disable eqeqeq */
    if (value == Number(value)) {
      return Number(value);
    }
    /*eslint-enable eqeqeq */
  }
  return value;
}

export function assignToArgs(args: Object, flag: Object|string, value: any): void {
  if (typeof flag !== "object") {
    flag = {name: flag};
  }
  if (flag.ignore) {
    return;
  }

  if (flag.type === "string") {
    value = String(value);
  } else {
    value = normalize(value);
    if (flag.type === "boolean") {
      value = Boolean(value);
    } else if (flag.type === "number") {
      value = Number(value);
    }
  }

  if (flag.multi && args.hasOwnProperty(flag.name)) {
    let value_ = args[flag.name];
    if (!(value_ instanceof Array)) {
      value_ = [value_];
    }
    value_.push(value);
    value = value_;
  }

  if (flag.onValue) {
    let value_ = flag.onValue(value);
    if (value_ !== undefined) {
      value = value_;
    }
  }
  args[flag.name] = value;
}
