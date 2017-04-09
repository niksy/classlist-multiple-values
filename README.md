# classlist-multiple-values

[![Build Status][ci-img]][ci] [![BrowserStack Status][browserstack-img]][browserstack]

Use multiple values for [`classList.add` and `classList.remove` methods][classlist-methods].

## Install

```sh
npm install classlist-multiple-values --save
```

## Usage

```js
const multipleValues = require('classlist-multiple-values');
const element = document.querySelector('.jackie');

const cl = multipleValues(element.classList);

cl.add('henry winnie');
cl.add(['scooter', 'emma']);

cl.remove('henry winnie');
cl.remove(['scooter', 'emma']);
```

## API

### multipleValues(classList)

Returns: `Object`

Returns improved `add` and `remove` methods.

#### classList

Type: `Object|DOMTokenList`

`Object` or `DOMTokenList` which must contain `add` and `remove` methods.

### multipleValues.add(values)

#### values

Type: `String[]|String`

Array of strings or space-separated string of class values to add to the element.

### multipleValues.remove(values)

#### values

Type: `String[]|String`

Array of strings or space-separated string of class values to remove from the element.

## Test

For local automated tests, run `npm run test:automated:local`.

## Browser support

Tested in IE9+ and all modern browsers.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/classlist-multiple-values
[ci-img]: https://travis-ci.org/niksy/classlist-multiple-values.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=V2FNVS8xa2dmYnVzSmJneENCU2N5VlVTZVpEbEY4M0t6elhzajF0VFdtTT0tLVFhMzhmVmNtbEphSU9QbHdCdmRFMlE9PQ==--27b6196d0e02ab3e288002ac92b910791766a71b
[classlist-methods]: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Methods
