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
function kanjiReadingChecker(e, n) {
  const i = ["kunyomi", "onyomi", "nanori"],
    t = n.auxiliary_readings
      .filter((e) => "whitelist" === e.type)
      .map((e) => e.reading);
  let a = n[n.primary_reading_type];
  a = a.concat(t);
  const r = i
      .filter((e) => e !== n.primary_reading_type)
      .reduce((e, i) => e.concat(n[i]), []),
    s = a.length > 1,
    c = { onyomi: "on\u2019yomi", kunyomi: "kun\u2019yomi", nanori: "nanori" };
  let o = -1 !== r.indexOf(e) && -1 === a.indexOf(e);
  return (
    o &&
      (o = `WaniKani is looking for the ${c[n.primary_reading_type]} reading.`),
    {
      passed: -1 !== a.indexOf(e),
      accurate: -1 !== a.indexOf(e),
      multipleAnswers: s,
      exception: o,
    }
  );
}
function vocabularyReadingChecker(e, n) {
  let i = n.readings.map((e) => e.reading);
  const t = n.auxiliary_readings
    .filter((e) => "whitelist" === e.type)
    .map((e) => e.reading);
  return (
    (i = i.concat(t)),
    {
      passed: -1 !== i.indexOf(e),
      accurate: -1 !== i.indexOf(e),
      multipleAnswers: n.readings.length > 1,
      exception: !1,
    }
  );
}
function getFullMeaningAnswerList(e, n, i) {
  const t = e.auxiliary_meanings
    .filter((e) => "whitelist" === e.type)
    .map((e) => e.meaning);
  let a = e.meanings
    .concat(i)
    .concat(t)
    .map((e) => normalizeResponse(e));
  const r = a.filter((e) => hasDigits(e));
  return hasDigits(n) && r.length > 0 && (a = r), a;
}
function isBlacklisted(e, n) {
  return e.auxiliary_meanings.some(
    ({ type: e, meaning: i }) => "blacklist" === e && normalizeResponse(i) === n
  );
}
function isAccurate(e, n) {
  return e.some((e) => e === n);
}
function isPassing(e, n) {
  if (
    hasDigits(n) &&
    e.some((e) => hasDigits(e)) &&
    !e.some((e) => digitsMatch(e, n))
  )
    return !1;
  const i = getLevenshteinTolerance(n);
  return e.some((e) => getLevenshteinDistance(e, n) <= i);
}
function meaningChecker(e, n, i) {
  let t = !1,
    a = !1;
  const r = !1,
    s = getFullMeaningAnswerList(n, e, i),
    c = n.meanings.length > 1;
  return (
    isBlacklisted(n, e) || ((a = isAccurate(s, e)), (t = isPassing(s, e))),
    { passed: t, accurate: a, multipleAnswers: c, exception: r }
  );
}
function isInSynonyms(e, n, i) {
  return (
    "meaning" === e &&
    0 !== i.length &&
    i.find((e) => e.trim().toLowerCase() === n.trim().toLowerCase())
  );
}
import {
  getLevenshteinTolerance,
  getLevenshteinDistance,
} from "lib/answer_checker/utils/levenshtein_helpers";
import { normalizeResponse } from "lib/answer_checker/utils/response_helpers";
import checkKanji from "lib/answer_checker/plugins/checkKanjiPlugin";
import checkLongDash from "lib/answer_checker/plugins/checkLongDashPlugin";
import checkN from "lib/answer_checker/plugins/checkNPlugin";
import checkRelatedMeaningsAndReadings from "lib/answer_checker/plugins/checkRelatedMeaningsAndReadingsPlugin";
import checkSmallHiragana from "lib/answer_checker/plugins/checkSmallHiraganaPlugin";
import checkThatVerbStartsWithTo from "lib/answer_checker/plugins/checkThatVerbStartsWithToPlugin";
import checkTransliterated from "lib/answer_checker/plugins/checkTransliteratedPlugin";
import checkWarningList from "lib/answer_checker/plugins/checkWarningListPlugin";
import checkKanjiDoesNotStartWithTo from "lib/answer_checker/plugins/check_kanji_does_not_start_with_to";
import checkImpossibleKana from "lib/answer_checker/plugins/check_impossible_kana";
const evaluators = {
  Kanji: { reading: kanjiReadingChecker, meaning: meaningChecker },
  Vocabulary: { reading: vocabularyReadingChecker, meaning: meaningChecker },
  Radical: { meaning: meaningChecker },
  KanaVocabulary: { meaning: meaningChecker },
};
export default class AnswerChecker {
  evaluate({
    questionType: e,
    response: n,
    item: i,
    userSynonyms: t,
    inputChars: a,
  }) {
    let r = normalizeResponse(n);
    const s = (0, evaluators[i.type][e])(r, i, t);
    if (((s.passed && !s.accurate) || !s.passed) && !isInSynonyms(e, n, t)) {
      const r = this.evaluatePlugins({
        questionType: e,
        response: n,
        item: i,
        result: s,
        inputChars: a,
        userSynonyms: t,
      });
      if (r) return { exception: r };
    }
    return s;
  }
  evaluatePlugins(e) {
    const n = [
      checkImpossibleKana,
      checkWarningList,
      checkTransliterated,
      checkRelatedMeaningsAndReadings,
      checkKanji,
      checkLongDash,
      checkThatVerbStartsWithTo,
      checkSmallHiragana,
      checkN,
      checkKanjiDoesNotStartWithTo,
    ];
    for (let i = 0; i < n.length; i += 1) {
      const t = n[i](e);
      if (t) return t;
    }
    return null;
  }
}
