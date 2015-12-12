# [![Natron][natron-img]][natron-url]

[natron-img]: http://static.natronjs.com/img/natronjs.svg
[natron-url]: http://natronjs.com/

**High-Resolution Time Format**

[![Version][npm-img]][npm-url]
[![Downloads][dlm-img]][npm-url]
[![Build Status][travis-img]][travis-url]
[![ReadMe][readme-img]][readme-url]

[![Gitter Chat][gitter-img]][gitter-url]

[npm-img]: https://img.shields.io/npm/v/natron-hrtime-format.svg
[npm-url]: https://npmjs.org/package/natron-hrtime-format
[dlm-img]: https://img.shields.io/npm/dm/natron-hrtime-format.svg
[travis-img]: https://travis-ci.org/natronjs/natron.svg
[travis-url]: https://travis-ci.org/natronjs/natron
[readme-img]: https://img.shields.io/badge/read-me-orange.svg
[readme-url]: https://natron.readme.io/docs/module-natron-hrtime-format

[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/natronjs/natron

This module is part of [Natron][natron-url] and contains
formatting utilities for [`process.hrtime`](https://nodejs.org/api/process.html#process_process_hrtime).

## Documentation

See the [documentation for `natron-hrtime-format`][readme-url]

## Usage

```js
import {format} from "natron-hrtime-format";

let start = process.hrtime();

setTimeout(() => {
  let end = process.hrtime(start);
  console.log(format(end));
}, Math.random() * 2000);
```
