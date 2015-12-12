/**
 * @module natron-hrtime-format
 */

const HRTIME_UNITS = ["ns", "μs", "ms", "s", "min", "h"];

export function format(time: [number, number]): string {
  if (!(time instanceof Array)) {
    time = [0, NaN];
  }
  let t, i, j, [s, ns] = time;
  if (s > 0) {
    // Seconds
    for (t = s, i = 3, j = ""; t > 60 && i < 5; i++) {
      j = " " + ((t % 60)|0) + " " + HRTIME_UNITS[i];
      t /= 60;
    }
    if (i > 3) {
      return (t|0) + " " + HRTIME_UNITS[i] + j;
    }
    t += ns / 1e9;
  } else {
    // Nanoseconds
    for (t = ns, i = 0, j = ""; t > 1e3; i++) {
      t /= 1e3;
    }
  }
  let f = t.toFixed(i && t < 100 && (t < 10 ? 2 : 1));
  return f + " " + HRTIME_UNITS[i];
}
