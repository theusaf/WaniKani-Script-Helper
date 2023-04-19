function onlyHasLongDashTypos(n, e, o, a) {
  if (o === n[a]) return !0;
  const t = soundAlikes[o] === n[a],
    r = "\u30fc" === e[a],
    i = -1 === Object.keys(soundAlikes).indexOf(e[a - 1]);
  return t && r && i;
}
import { toRomaji } from "wanakana";
import { toHiragana as wanakanaToHiragana } from "wanakana";
import toIME from "lib/answer_checker/utils/toIME";
import getReadingsFromSubject from "lib/answer_checker/utils/get_readings_from_subject";
const toHiragana = (n) => wanakanaToHiragana(n, { convertLongVowelMark: !1 }),
  soundAlikes = { "\u304a": "\u3046", "\u3046": "\u304a", "\u3048": "\u3044" },
  getEndingVowel = (n) => {
    const e = toRomaji(n);
    return e[e.length - 1];
  },
  vowelsAreSimilar = (n, e, o) =>
    n.length === e.length &&
    n.split("").every((n, a) => onlyHasLongDashTypos(e, o, n, a)),
  convertDashToVowel = (n) => {
    let e = "";
    for (let o = 0; o < n.length; o++)
      "\u30fc" === n[o]
        ? (e += toHiragana(getEndingVowel(n[o - 1])))
        : (e += toHiragana(n[o]));
    return e;
  };
export default function checkLongDash({
  questionType: n,
  response: e,
  item: o,
}) {
  if ("reading" !== n || !o) return null;
  const a = getReadingsFromSubject(o).find(
    (n) =>
      -1 !== n.indexOf("\u30fc") &&
      vowelsAreSimilar(convertDashToVowel(n), toHiragana(e), n)
  );
  return a
    ? `Try typing \u201c${toIME(a)}\u201d to get that long \u30fc.`
    : null;
}
