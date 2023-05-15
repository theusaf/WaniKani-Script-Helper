# 2023-05-15

## Plugins

All plugins now use the `Plugin` class.
See commit history/code for details.

## `Plugin`

An abstract class that plugins extend.

- `get shouldEvaluate()`
- `get readings()`
- `evaluate()`

## `AnswerChecker`

- `get plugins()` - returns the list of plugins (read-only)
- `messageForItemInfo()`

# 2023-04-23

Adds a new plugin to check for impossible kana combinations.

# 2023-04-19

## `ScrollableController`

- `scrollPageDown()`
- `scrollPageUp()`
- `scrollByOffset(offset)`

Add methods for scrolling in the page.

## `QuizInputController`

- `inputChars`
- `currentQuestionType`
- `currentSubject`
- `bindWanakana()`
- `unbindWanakana()`

Add methods to bind and unbind the wanakana input. Add 'input chars' property.

## `checkKanjiDoesNotStartWithTo` (plugin)

Add a plugin that checks for kanji being confused as a verb.

## `checkRelatedMeaningsAndReadingsPlugin` (plugin)

Rename check single kanji plugin.

## `checkSingleKanjiPlugin`

Remove (see above)

## All plugins

Use hash input rather than multiple arguments.

## Other

Add a shim for `window.visualViewport`
