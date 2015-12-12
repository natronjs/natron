"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @module natron-args-parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArgsParser = undefined;
exports.parse = parse;

var _helper = require("./helper");

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArgsParser = exports.ArgsParser = (function () {
  function ArgsParser(options) {
    _classCallCheck(this, ArgsParser);

    this.options = _extends({}, options);
    this.flags = new Map();

    if (this.options.flags) {
      var flags = this.options.flags;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(flags)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;

          var flag = _extends({ name: name }, flags[name]);
          this.flags.set(name, flag);

          if (flag.alias) {
            if (flag.alias instanceof Array) {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = flag.alias[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var alias = _step2.value;

                  this.flags.set(alias, flag);
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            } else {
              this.flags.set(flag.alias, flag);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  _createClass(ArgsParser, [{
    key: "parse",
    value: function parse(argv) {
      var args = { "_": [] };

      for (var p = { i: 0, argv: argv }; p.i < argv.length; p.i++) {
        var arg = argv[p.i];

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
          var stopEarly = this.options.stopEarly;
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
  }, {
    key: "stopParsing",
    value: function stopParsing(args, p) {
      if (this.options["--"]) {
        args["--"] = [];
      }
      p.stop = true;
    }
  }, {
    key: "parseFlag",
    value: function parseFlag(arg, args, p) {
      var _splitAtEq = (0, _helper.splitAtEq)(arg.replace(/^[-]+/, ""));

      var _splitAtEq2 = _slicedToArray(_splitAtEq, 2);

      var flag = _splitAtEq2[0];
      var value = _splitAtEq2[1];

      if (arg[1] !== "-" && flag.length > 1) {
        value = value || true;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = flag.split("")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var f = _step3.value;

            var info_ = this.getFlagInfo(f);
            (0, _helper.assignToArgs)(args, info_ || f, value);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return;
      }

      var type = this.options.greedy;
      if (/^no-/.test(flag)) {
        flag = flag.slice(3);
        type = "false";
      }

      var info = this.getFlagInfo(flag);
      if (!info && this.options.onUnknownFlag) {
        info = this.options.onUnknownFlag(flag, value, args);
        if (info === false) {
          info = { name: flag, ignore: true };
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
        var next = p.argv[p.i + 1];
        if (!/^-/.test(next)) {
          value = next;
          p.i++;
        }
      }
      (0, _helper.assignToArgs)(args, info || flag, value);
    }
  }, {
    key: "parseArg",
    value: function parseArg(arg, args) {
      if (this.options.onArg) {
        var arg_ = this.options.onArg(arg, args);
        if (arg_ !== undefined) {
          arg = arg_;
        }
      }
      if (arg) {
        args["_"].push(arg);
      }
    }
  }, {
    key: "getFlagInfo",
    value: function getFlagInfo(name) {
      return this.flags.get(name);
    }
  }]);

  return ArgsParser;
})();

function parse(argv, options) {
  if ((typeof argv === "undefined" ? "undefined" : _typeof(argv)) === "object" && !(argv instanceof Array)) {
    var _ref = [process.argv.slice(2), argv];
    argv = _ref[0];
    options = _ref[1];
  }
  var parser = new ArgsParser(options);
  return parser.parse(argv);
}