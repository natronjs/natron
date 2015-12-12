"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitAtEq = splitAtEq;
exports.normalize = normalize;
exports.assignToArgs = assignToArgs;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * @module natron-args-parser
 */

function splitAtEq(chunk) {
  var m = chunk.match(/^([^=]+)=([\s\S]*)$/);
  return m ? [m[1], m[2]] : [chunk];
}

function normalize(value) {
  if (typeof value === "string") {
    var value_ = value.trim().toLowerCase();
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

function assignToArgs(args, flag, value) {
  if ((typeof flag === "undefined" ? "undefined" : _typeof(flag)) !== "object") {
    flag = { name: flag };
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
    var value_ = args[flag.name];
    if (!(value_ instanceof Array)) {
      value_ = [value_];
    }
    value_.push(value);
    value = value_;
  }

  if (flag.onValue) {
    var value_ = flag.onValue(value);
    if (value_ !== undefined) {
      value = value_;
    }
  }
  args[flag.name] = value;
}