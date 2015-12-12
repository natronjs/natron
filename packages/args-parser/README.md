# [![Natron][natron-img]][natron-url]

[natron-img]: http://static.natronjs.com/img/natronjs.svg
[natron-url]: http://natronjs.com/

**Parse Command-Line Arguments**

[![Version][npm-img]][npm-url]
[![Downloads][dlm-img]][npm-url]
[![ReadMe][readme-img]][readme-url]

[![Gitter Chat][gitter-img]][gitter-url]

[npm-img]: https://img.shields.io/npm/v/natron-args-parser.svg
[npm-url]: https://npmjs.org/package/natron-args-parser
[dlm-img]: https://img.shields.io/npm/dm/natron-args-parser.svg
[readme-img]: https://img.shields.io/badge/read-me-orange.svg
[readme-url]: https://natron.readme.io/docs/module-natron-args-parser

[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/natronjs/natron

This module is part of [Natron][natron-url] and contains
utilities for parsing command-line arguments.

## Documentation

See the [documentation for `natron-args-parser`][readme-url]

## Usage

```js
import {parse} from "natron-args-parser";

// process.argv.slice(2) = [
//  "arg1",
//  "--foo",
//  "arg2",
//  "--bar",
//  "value",
//  "--num=12345",
// ]

let args = parse(process.argv.slice(2), {
  flags: {
    "foo": {
      type: "boolean",
    },
  },
  greedy: true,
});

// args = {
//   "_": ["arg1", "arg2"],
//   "foo": true,
//   "bar": "value",
//   "num": 12345,
// }
```
