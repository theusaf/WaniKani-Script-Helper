function filterDigits(e) {
  const n = e.match(/\d+/g);
  return n ? n.sort() : [];
}
function hasDigits(e) {
  return filterDigits(e).length > 0;
}
function digitsMatch(e, n) {
  return filterDigits(e).toString() === filterDigits(n).toString();
}
function checkReading(e, n) {
  return {
    passed: isAccurate(e, n),
    accurate: isAccurate(e, n),
    multipleAnswers: n.length > 1,
  };
}
function readingAnswerList(e) {
  let n = e.auxiliary_readings
    .filter((e) => "whitelist" === e.type)
    .map((e) => e.reading);
  switch (e.type) {
    case "Kanji":
      n = n.concat(e[e.primary_reading_type]);
      break;
    case "Vocabulary":
      n = n.concat(e.readings.map((e) => e.reading));
  }
  return n;
}
function getFullMeaningAnswerList(e, n, t) {
  const s = e.auxiliary_meanings
    .filter((e) => "whitelist" === e.type)
    .map((e) => e.meaning);
  let i = e.meanings
    .concat(t)
    .concat(s)
    .map((e) => normalizeResponse(e));
  const a = i.filter((e) => hasDigits(e));
  return hasDigits(n) && a.length > 0 && (i = a), i;
}
function isBlacklisted(e, n) {
  return e.auxiliary_meanings.some(
    ({ type: e, meaning: t }) => "blacklist" === e && normalizeResponse(t) === n
  );
}
function isAccurate(e, n) {
  return -1 !== n.indexOf(e);
}
function isPassing(e, n) {
  if (
    hasDigits(e) &&
    n.some((e) => hasDigits(e)) &&
    !n.some((n) => digitsMatch(n, e))
  )
    return !1;
  const t = getLevenshteinTolerance(e);
  return n.some((n) => getLevenshteinDistance(n, e) <= t);
}
function checkMeaning(e, n, t) {
  const s = getFullMeaningAnswerList(n, e, t),
    i = n.meanings.length > 1;
  return isBlacklisted(n, e)
    ? { passed: !1, accurate: !1, multipleAnswers: i }
    : {
        passed: isPassing(e, s),
        accurate: isAccurate(e, s),
        multipleAnswers: i,
      };
}
function isInSynonyms(e, n) {
  return (
    0 !== n.length &&
    n.find((n) => n.trim().toLowerCase() === e.trim().toLowerCase())
  );
}
import {
  getLevenshteinTolerance,
  getLevenshteinDistance,
} from "lib/answer_checker/utils/levenshtein_helpers";
import { normalizeResponse } from "lib/answer_checker/utils/response_helpers";
import { CheckKanji } from "lib/answer_checker/plugins/check_kanji";
import { CheckLongDash } from "lib/answer_checker/plugins/check_long_dash";
import { CheckN } from "lib/answer_checker/plugins/check_n";
import { CheckRelatedMeaningsAndReadings } from "lib/answer_checker/plugins/check_related_meanings_and_readings";
import { CheckSmallHiragana } from "lib/answer_checker/plugins/check_small_hiragana";
import { CheckThatVerbStartsWithTo } from "lib/answer_checker/plugins/check_that_verb_starts_with_to";
import { CheckTransliterated } from "lib/answer_checker/plugins/check_transliterated";
import { CheckWarningList } from "lib/answer_checker/plugins/check_warning_list";
import { CheckKanjiDoesNotStartWithTo } from "lib/answer_checker/plugins/check_kanji_does_not_start_with_to";
import { CheckImpossibleKana } from "lib/answer_checker/plugins/check_impossible_kana";
import { CheckKanjiReadings } from "lib/answer_checker/plugins/check_kanji_readings";
import {
  answerActionPass,
  answerActionFail,
  itemInfoException,
} from "lib/answer_checker/utils/constants";
export default class AnswerChecker {
  evaluate({
    questionType: e,
    response: n,
    item: t,
    userSynonyms: s,
    inputChars: i,
  }) {
    let a = normalizeResponse(n);
    const r =
      "meaning" === e
        ? checkMeaning(a, t, s)
        : checkReading(a, readingAnswerList(t));
    if ((r.passed && !r.accurate) || !r.passed) {
      const a = this.evaluatePlugins({
        questionType: e,
        response: n,
        item: t,
        result: r,
        inputChars: i,
        userSynonyms: s,
      });
      if (a) return a;
    }
    return {
      action: r.passed ? answerActionPass : answerActionFail,
      message: this.messageForItemInfo({
        result: r,
        response: n,
        userSynonyms: s,
        questionType: e,
      }),
    };
  }
  messageForItemInfo({
    result: e,
    response: n,
    userSynonyms: t,
    questionType: s,
  }) {
    const i = itemInfoException;
    return !e.passed && isInSynonyms(n, t)
      ? {
          type: i,
          text: "That\u2019s one of your synonyms, but we can\u2019t accept it because it\u2019s not a valid meaning.",
        }
      : e.passed
      ? e.passed && e.accurate && e.multipleAnswers
        ? {
            type: i,
            text: `Did you know this item has multiple possible ${s}s?`,
          }
        : e.passed && !e.accurate
        ? {
            type: i,
            text: `Your answer was a bit off. Check the ${s} to make sure you are correct.`,
          }
        : null
      : { type: i, text: `Need help? View the correct ${s} and mnemonic.` };
  }
  evaluatePlugins(e) {
    let n = null;
    return (
      this.plugins.find((t) => {
        const s = new t(e);
        return (n = s.shouldEvaluate && s.evaluate()), n;
      }),
      n
    );
  }
  get plugins() {
    return [
      CheckImpossibleKana,
      CheckKanjiReadings,
      CheckWarningList,
      CheckTransliterated,
      CheckRelatedMeaningsAndReadings,
      CheckKanji,
      CheckLongDash,
      CheckThatVerbStartsWithTo,
      CheckSmallHiragana,
      CheckN,
      CheckKanjiDoesNotStartWithTo,
    ];
  }
}
