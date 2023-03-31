# wkhf — WaniKani Hotwired Framework

A framework for writing scripts for WaniKani, focused on WaniKani's Hotwired UI.

## What does this do?

This script works by wrapping various methods so that they can be stopped or overridden.

## Usage

Since WaniKani is becoming a single-page application, I recommend the following:

```js
// @match        https://www.wanikani.com/*
```

There are a few ways to use this framework:

1. Use the `wkhf` object directly:

```js
if (window.wkhf) {
  window.wkhf.registerScript("my-script", {
    locationMatcher: "https://www.wanikani.com/subjects/*",
    activate: () => {
      // Do stuff
    },
    deactivate: () => {
      // Clean up
    },
  });
}
```

2. Use methods from the patched modules:

```js
const {
  default: AnswerChecker, // Patched original module
  hasDigits, // Method that was not exported originally
  wkhfRegisterPlugin, // New method created by wkhf
} = await import("lib/answer_checker/answer_checker");

// ...
```
