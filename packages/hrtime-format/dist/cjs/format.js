"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
/**
 * @module natron-hrtime-format
 */

var HRTIME_UNITS = ["ns", "μs", "ms", "s", "min", "h"];

function format(time) {
  if (!(time instanceof Array)) {
    time = [0, NaN];
  }
  var t = undefined;var i = undefined;var j = undefined;var _time = time;

  var _time2 = _slicedToArray(_time, 2);

  var s = _time2[0];
  var ns = _time2[1];

  if (s > 0) {
    // Seconds
    for (t = s, i = 3, j = ""; t > 60 && i < 5; i++) {
      j = " " + (t % 60 | 0) + " " + HRTIME_UNITS[i];
      t /= 60;
    }
    if (i > 3) {
      return (t | 0) + " " + HRTIME_UNITS[i] + j;
    }
    t += ns / 1e9;
  } else {
    // Nanoseconds
    for (t = ns, i = 0, j = ""; t > 1e3; i++) {
      t /= 1e3;
    }
  }
  var f = t.toFixed(i && t < 100 && (t < 10 ? 2 : 1));
  return f + " " + HRTIME_UNITS[i];
}