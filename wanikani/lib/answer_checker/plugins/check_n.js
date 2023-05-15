import { Plugin } from "lib/answer_checker/plugins/plugin";
import {
  answerActionRetry,
  answerException,
} from "lib/answer_checker/utils/constants";
import { toRomaji } from "wanakana";
import toIME from "lib/answer_checker/utils/toIME";
const customRomajiMapping = {
    "\u3062": "di",
    "\u3065": "du",
    "\u3062\u3083": "dya",
    "\u3062\u3085": "dyu",
    "\u3062\u3087": "dyo",
    "\u3075": "hu",
  },
  toRomajiCustom = (n) =>
    toRomaji(n, { customRomajiMapping: customRomajiMapping }),
  toRomajiMora = (n) =>
    n.split("").map((n) => ("\u3063" === n ? "*" : toRomajiCustom(n))),
  identicalArrays = (n, t) =>
    n.length === t.length && n.every((n, e) => n === t[e]),
  cloneAndSplice = (n, t, e, ...i) => {
    const a = n.slice();
    return a.splice(t, e, ...i), a;
  },
  createMissingNPermutations = (n, t = 0) => {
    const e = n[n.length - 1],
      i = (t, e = 0) => {
        n.push(t), createMissingNPermutations(n, e);
      };
    return (
      e.forEach((n, a) => {
        if (!n.startsWith("n") || a < t) return;
        const o = e[a + 1];
        if (
          ("n" === n &&
            (o &&
              /^[aeiou]$/.test(o) &&
              i(cloneAndSplice(e, a + 1, 1, `n${o}`)),
            o &&
              /^(ya|yu|yo)$/.test(o) &&
              i(cloneAndSplice(e, a + 1, 0, "ni"))),
          /^n[aeiou]$/.test(n) && a > 0 && "n" !== e[a - 1])
        ) {
          const t = cloneAndSplice(e, a, 1, "n", n.charAt(1));
          i(t, a + 1),
            "ni" === n &&
              o &&
              /^(ya|yu|yo)$/.test(o) &&
              i(cloneAndSplice(e, a, 1, "n"), a + 1);
        }
      }),
      n
    );
  },
  createTooManyNPermutations = (n, t = 0) => {
    const e = n[n.length - 1],
      i = (t, e = 0) => {
        n.push(t), createTooManyNPermutations(n, e);
      };
    return (
      e.forEach((n, a) => {
        if ("n" !== n || a < t) return;
        const o = e[a + 1];
        if (
          (o &&
            /^n[aeou]$/.test(o) &&
            i(cloneAndSplice(e, a + 1, 1, o.charAt(1)), a + 1),
          "ni" === o)
        ) {
          const n = e[a + 2];
          /^(ya|yu|yo)$/.test(n)
            ? i(cloneAndSplice(e, a + 1, 1), a + 1)
            : i(cloneAndSplice(e, a + 1, 1, o.charAt(1)), a + 1);
        }
      }),
      n
    );
  },
  findMatchingIndexInArrayOfArrays = (n, t) =>
    n.findIndex((n) => t.some((t) => identicalArrays(n, t)));
export class CheckN extends Plugin {
  get shouldEvaluate() {
    return this.item.readings && "reading" === this.questionType;
  }
  evaluate() {
    if (this.readingsContainingN.length > 0) {
      const n = this.findIndexOfReadingWithTooFewNs();
      if (-1 !== n) {
        let t = `Don\u2019t forget that \u3093 is typed as \u201cnn\u201d. Try typing \u201c${toIME(
          this.readingsContainingN[n]
        )}\u201d.`;
        return {
          action: answerActionRetry,
          message: { type: answerException, text: t },
        };
      }
      if (-1 !== this.findIndexOfReadingWithTooManyNs()) {
        return {
          action: answerActionRetry,
          message: {
            type: answerException,
            text: 'That looks like a typo. Watch out for those "n"s.',
          },
        };
      }
    }
    return null;
  }
  get readingsContainingN() {
    return (
      void 0 === this._readingsContainingN &&
        (this._readingsContainingN = this.readings.filter(
          (n) => -1 !== n.indexOf("\u3093")
        )),
      this._readingsContainingN
    );
  }
  findIndexOfReadingWithTooFewNs() {
    return this.findIndexOfReadingMatchingPermutations(
      createMissingNPermutations
    );
  }
  findIndexOfReadingWithTooManyNs() {
    return this.findIndexOfReadingMatchingPermutations(
      createTooManyNPermutations
    );
  }
  findIndexOfReadingMatchingPermutations(n) {
    const t = n([toRomajiMora(this.response)]);
    return findMatchingIndexInArrayOfArrays(
      this.readingsContainingN.map(toRomajiMora),
      t
    );
  }
}
