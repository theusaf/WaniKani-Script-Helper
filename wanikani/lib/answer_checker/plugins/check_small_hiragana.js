function checkforTypo(e, t) {
  return e === smallPairs[t] && t;
}
function classify(e, t) {
  return checkforTypo(e, t)
    ? CLASSIFICATIONS.typo
    : e === t || CLASSIFICATIONS.mistake;
}
function findCorrections(e, t) {
  const n = [];
  for (let r = 0; r < e.length; r += 1) {
    const i = e[r],
      o = t[r],
      s = classify(i, o);
    if (
      (s === CLASSIFICATIONS.typo &&
        n.push({ expectedChar: o, expectedAnswer: t }),
      s === CLASSIFICATIONS.mistake)
    )
      return !1;
  }
  return n;
}
function compareBigAndSmall(e, t) {
  return e.length === t.length && findCorrections(e, t);
}
import { Plugin } from "lib/answer_checker/plugins/plugin";
import toIME from "lib/answer_checker/utils/toIME";
import {
  answerActionRetry,
  answerException,
} from "lib/answer_checker/utils/constants";
const joinWordsNicely = (e) =>
    1 === e.length
      ? e[0]
      : 2 === e.length
      ? `${e[0]} and ${e[1]}`
      : `${e.slice(0, e.length - 1).join(", ")} and ${e[e.length - 1]}`,
  smallPairs = {
    "\u3083": "\u3084",
    "\u3085": "\u3086",
    "\u3087": "\u3088",
    "\u30e3": "\u30e4",
    "\u30e5": "\u30e6",
    "\u30e7": "\u30e8",
  },
  CLASSIFICATIONS = { typo: "typo", mistake: "mistake" };
export class CheckSmallHiragana extends Plugin {
  get shouldEvaluate() {
    return "reading" === this.questionType;
  }
  evaluate() {
    const e = this.readings
      .map((e) => compareBigAndSmall(this.response, e))
      .filter((e) => e)[0];
    if (e && e.length > 0) {
      const t = e.map(({ expectedChar: e }) => e);
      let n = `Watch out for the small ${joinWordsNicely(
        t
      )}. Try typing \u201c${toIME(e[0].expectedAnswer)}\u201d for this one.`;
      return {
        action: answerActionRetry,
        message: { type: answerException, text: n },
      };
    }
    return null;
  }
}
