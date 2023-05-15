import { Plugin } from "lib/answer_checker/plugins/plugin";
import { toHiragana as wanakanaToHiragana, toRomaji } from "wanakana";
import toIME from "lib/answer_checker/utils/toIME";
import {
  answerActionRetry,
  answerException,
} from "lib/answer_checker/utils/constants";
const toHiragana = (e) => wanakanaToHiragana(e, { convertLongVowelMark: !1 }),
  soundAlikes = { "\u304a": "\u3046", "\u3046": "\u304a", "\u3048": "\u3044" },
  getEndingVowel = (e) => {
    const t = toRomaji(e);
    return t[t.length - 1];
  };
export class CheckLongDash extends Plugin {
  get shouldEvaluate() {
    return "reading" === this.questionType;
  }
  evaluate() {
    const e = this.matchedLongDashReading;
    if (e) {
      let t = `Try typing \u201c${toIME(e)}\u201d to get that long \u30fc.`;
      return {
        action: answerActionRetry,
        message: { type: answerException, text: t },
      };
    }
    return null;
  }
  get matchedLongDashReading() {
    return this.readings.find(
      (e) => this.containsLongDash(e) && this.reponseMatchesConvertedReading(e)
    );
  }
  containsLongDash(e) {
    return -1 !== e.indexOf("\u30fc");
  }
  reponseMatchesConvertedReading(e) {
    const t = this.convertDashesToVowels(e),
      n = toHiragana(this.response);
    return this.vowelsMatch(t, n, e);
  }
  convertDashesToVowels(e) {
    let t = "";
    for (let n = 0; n < e.length; n++)
      "\u30fc" === e[n]
        ? (t += toHiragana(getEndingVowel(e[n - 1])))
        : (t += toHiragana(e[n]));
    return t;
  }
  vowelsMatch(e, t, n) {
    return (
      e.length === t.length &&
      e.split("").every((e, a) => this.charactersMatchWithTypos(t, n, e, a))
    );
  }
  charactersMatchWithTypos(e, t, n, a) {
    if (n === e[a]) return !0;
    const o = soundAlikes[n] === e[a],
      r = "\u30fc" === t[a],
      s = -1 === Object.keys(soundAlikes).indexOf(t[a - 1]);
    return o && r && s;
  }
}
