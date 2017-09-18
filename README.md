# Focus enter/exit

Provides event hooks for when focus enters or exits a DOM node or its
descendents.

[![npm Version][npm-badge]][npm]
[![Build Status][build-badge]][build-status]
[![Test Coverage][coverage-badge]][coverage-result]
[![Dependency Status][dep-badge]][dep-status]

Tracking when focus enters or leaves a parent DOM node can be tricky. Native
JavaScript provides `focusin` and `focusout` events, but these events continue
to fire even when focus is shifted within the target node itself, which at
times is not what you want. This library is a thin wrapper around those events,
offering additional callback hooks to fill this gap.

Browser support includes IE9+.

## Installation

Install using [npm][]:

    $ npm install focus-enter-exit --save-dev

## Usage

__fee__ takes a DOM node and `options` object as parameters, returning a new
`fee` instance:

```js
var fee = require('focus-enter-exit');

fee(document.getElementById('example'), {
    onFocusEnter: function(e) {
        // Do something on focus-enter.
    },
    onFocusExit: function(e) {
        // Do something on focus-exit.
    }
});
```

## Available Options

#### `onFocusEnter` (function, default: `noop`)

Called when focus enters the target element or one of its descendents from a
parent or sibling element. This callback is called with the corresponding
`focusin` event object.

#### `onFocusExit` (function, default: `noop`)

Called when focus exits the target element or one of its descendents for a
parent or sibling element. This callback is called with the corresponding
`focusout` event object.

## Available Methods

#### `stopListening()`

Remove all event handlers and discontinue triggering focus enter/exit
callbacks.

MIT

[build-badge]: https://img.shields.io/travis/jimf/focus-enter-exit/master.svg
[build-status]: https://travis-ci.org/jimf/focus-enter-exit
[npm-badge]: https://img.shields.io/npm/v/focus-enter-exit.svg
[npm]: https://www.npmjs.org/package/focus-enter-exit
[coverage-badge]: https://img.shields.io/coveralls/jimf/focus-enter-exit.svg
[coverage-result]: https://coveralls.io/r/jimf/focus-enter-exit
[dep-badge]: https://img.shields.io/david/jimf/focus-enter-exit.svg
[dep-status]: https://david-dm.org/jimf/focus-enter-exit
