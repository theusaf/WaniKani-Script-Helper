function onlyHasLongDashTypos(n, a, o, e) {
  if (o === n[e]) return !0;
  const t = soundAlikes[o] === n[e],
    r = "\u30fc" === a[e],
    i = -1 === Object.keys(soundAlikes).indexOf(a[e - 1]);
  return t && r && i;
}
import { toRomaji } from "wanakana";
import { toHiragana as wanakanaToHiragana } from "wanakana";
import toIME from "lib/answer_checker/utils/toIME";
import getReadingsFromSubject from "lib/answer_checker/utils/get_readings_from_subject";
const toHiragana = (n) => wanakanaToHiragana(n, { convertLongVowelMark: !1 }),
  soundAlikes = { "\u304a": "\u3046", "\u3046": "\u304a", "\u3048": "\u3044" },
  getEndingVowel = (n) => {
    const a = toRomaji(n);
    return a[a.length - 1];
  },
  vowelsAreSimilar = (n, a, o) =>
    n.length === a.length &&
    n.split("").every((n, e) => onlyHasLongDashTypos(a, o, n, e)),
  convertDashToVowel = (n) => {
    let a = "";
    for (let o = 0; o < n.length; o++)
      "\u30fc" === n[o]
        ? (a += toHiragana(getEndingVowel(n[o - 1])))
        : (a += toHiragana(n[o]));
    return a;
  };
export default function checkLongDash(n, a, o) {
  if ("reading" !== n || !o) return null;
  const e = getReadingsFromSubject(o).find(
    (n) =>
      -1 !== n.indexOf("\u30fc") &&
      vowelsAreSimilar(convertDashToVowel(n), toHiragana(a), n)
  );
  return e
    ? `Try typing \u201c${toIME(e)}\u201d to get that long \u30fc.`
    : null;
}
