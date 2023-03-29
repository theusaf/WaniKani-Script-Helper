function typeOf(t) {
  return null === t
    ? "null"
    : t !== Object(t)
    ? typeof t
    : {}.toString.call(t).slice(8, -1).toLowerCase();
}
function isEmpty(t) {
  return "string" !== typeOf(t) || !t.length;
}
function isCharInRange(t = "", e, n) {
  if (isEmpty(t)) return !1;
  const a = t.charCodeAt(0);
  return e <= a && a <= n;
}
function isCharJapanese(t = "") {
  return JAPANESE_POINTS.some(([e, n]) => isCharInRange(t, e, n));
}
function isJapanese(text = "", regex) {
  const isRegex = "regexp" === typeOf(regex);
  return (
    !isEmpty(text) &&
    [...text].every((char) => {
      const a = isCharJapanese(char);
      return isRegex ? a || regex.test(char) : a;
    })
  );
}
function isEqual(t, e) {
  return t === e || !(!numberIsNaN(t) || !numberIsNaN(e));
}
function areInputsEqual(t, e) {
  if (t.length !== e.length) return !1;
  for (var n = 0; n < t.length; n++) if (!isEqual(t[n], e[n])) return !1;
  return !0;
}
function memoizeOne(func, func2) {
  function memoizer() {
    for (var list = [], i = 0; i < arguments.length; i++)
      list[i] = arguments[i];
    if (a && a.lastThis === this && func2(list, a.lastArgs))
      return a.lastResult;
    var r = func.apply(this, list);
    return (a = { lastResult: r, lastArgs: list, lastThis: this }), r;
  }
  void 0 === func2 && (func2 = areInputsEqual);
  var a = null;
  return (
    (memoizer.clear = function () {
      a = null;
    }),
    memoizer
  );
}
function find(object, e, n) {
  for (n of object.keys()) if (dequal(n, e)) return n;
}
function dequal(object, object2) {
  var constructorOne, lengthA, lengthA2;
  if (object === object2) return !0;
  if (
    object &&
    object2 &&
    (constructorOne = object.constructor) === object2.constructor
  ) {
    if (constructorOne === Date) return object.getTime() === object2.getTime();
    if (constructorOne === RegExp)
      return object.toString() === object2.toString();
    if (constructorOne === Array) {
      if ((lengthA = object.length) === object2.length)
        for (; lengthA-- && dequal(object[lengthA], object2[lengthA]); );
      return -1 === lengthA;
    }
    if (constructorOne === Set) {
      if (object.size !== object2.size) return !1;
      for (lengthA of object) {
        if (
          (lengthA2 = lengthA) &&
          "object" == typeof lengthA2 &&
          !(lengthA2 = find(object2, lengthA2))
        )
          return !1;
        if (!object2.has(lengthA2)) return !1;
      }
      return !0;
    }
    if (constructorOne === Map) {
      if (object.size !== object2.size) return !1;
      for (lengthA of object) {
        if (
          (lengthA2 = lengthA[0]) &&
          "object" == typeof lengthA2 &&
          !(lengthA2 = find(object2, lengthA2))
        )
          return !1;
        if (!dequal(lengthA[1], object2.get(lengthA2))) return !1;
      }
      return !0;
    }
    if (constructorOne === ArrayBuffer)
      (object = new Uint8Array(object)), (object2 = new Uint8Array(object2));
    else if (constructorOne === DataView) {
      if ((lengthA = object.byteLength) === object2.byteLength)
        for (
          ;
          lengthA-- && object.getInt8(lengthA) === object2.getInt8(lengthA);

        );
      return -1 === lengthA;
    }
    if (ArrayBuffer.isView(object)) {
      if ((lengthA = object.byteLength) === object2.byteLength)
        for (; lengthA-- && object[lengthA] === object2[lengthA]; );
      return -1 === lengthA;
    }
    if (!constructorOne || "object" == typeof object) {
      for (constructorOne in ((lengthA = 0), object)) {
        if (
          hasOwnProperty.call(object, constructorOne) &&
          ++lengthA &&
          !hasOwnProperty.call(object2, constructorOne)
        )
          return !1;
        if (
          !(constructorOne in object2) ||
          !dequal(object[constructorOne], object2[constructorOne])
        )
          return !1;
      }
      return Object.keys(object2).length === lengthA;
    }
  }
  return object != object && object2 != object2;
}
function applyMapping(in1, in2, flag) {
  function getOffset(text, index) {
    if (void 0 !== text[index])
      return Object.assign({ "": text[""] + index }, text[index]);
  }
  function copyMap(text, index) {
    const firstChar = text.charAt(0);
    return executeMap(
      Object.assign({ "": firstChar }, map2[firstChar]),
      text.slice(1),
      index,
      index + 1
    );
  }
  function executeMap(text, list, start, end) {
    if (!list)
      return flag || 1 === Object.keys(text).length
        ? text[""]
          ? [[start, end, text[""]]]
          : []
        : [[start, end, null]];
    if (1 === Object.keys(text).length)
      return [[start, end, text[""]]].concat(copyMap(list, end));
    const offset = getOffset(text, list.charAt(0));
    return void 0 === offset
      ? [[start, end, text[""]]].concat(copyMap(list, end))
      : executeMap(offset, list.slice(1), start, end + 1);
  }
  const map2 = in2;
  return copyMap(in1, 0);
}
function transform(t) {
  return Object.entries(t).reduce((t, [e, n]) => {
    const a = "string" === typeOf(n);
    return (t[e] = a ? { "": n } : transform(n)), t;
  }, {});
}
function getSubTreeOf(initialValue, text) {
  return text
    .split("")
    .reduce((t, e) => (void 0 === t[e] && (t[e] = {}), t[e]), initialValue);
}
function createCustomMapping(t = {}) {
  const e = {};
  return (
    "object" === typeOf(t) &&
      Object.entries(t).forEach(([t, n]) => {
        let a = e;
        t.split("").forEach((t) => {
          void 0 === a[t] && (a[t] = {}), (a = a[t]);
        }),
          (a[""] = n);
      }),
    function (t) {
      function n(obj, obj2) {
        return void 0 === obj || "string" === typeOf(obj)
          ? obj2
          : Object.entries(obj2).reduce(
              (prev, [key, val]) => ((prev[key] = n(obj[key], val)), prev),
              obj
            );
      }
      return n(JSON.parse(JSON.stringify(t)), e);
    }
  );
}
function mergeCustomMapping(t, e) {
  return e ? ("function" === typeOf(e) ? e(t) : createCustomMapping(e)(t)) : t;
}
function createRomajiToKanaMap$1() {
  function t(t) {
    return [...Object.entries(ADDITIONAL_MAPS), ["c", "k"]].reduce(
      (e, [n, a]) => (t.startsWith(a) ? e.concat(t.replace(a, n)) : e),
      []
    );
  }
  function e(t) {
    return Object.entries(t).reduce(
      (t, [n, a]) => ((t[n] = n ? e(a) : `\u3063${a}`), t),
      {}
    );
  }
  const n = transform(_),
    a = (t) => getSubTreeOf(n, t);
  return (
    Object.entries(B).forEach(([t, e]) => {
      Object.entries(G).forEach(([n, i]) => {
        a(t + n)[""] = e + i;
      });
    }),
    Object.entries(W).forEach(([t, e]) => {
      a(t)[""] = e;
    }),
    Object.entries(Y).forEach(([t, e]) => {
      Object.entries(V).forEach(([n, i]) => {
        a(t + n)[""] = e + i;
      });
    }),
    ["n", "n'", "xn"].forEach((t) => {
      a(t)[""] = "\u3093";
    }),
    (n.c = JSON.parse(JSON.stringify(n.k))),
    Object.entries(ADDITIONAL_MAPS).forEach(([t, e]) => {
      const n = t.slice(0, t.length - 1),
        i = t.charAt(t.length - 1);
      a(n)[i] = JSON.parse(JSON.stringify(a(e)));
    }),
    Object.entries(X).forEach(([e, n]) => {
      const i = (t) => t.charAt(t.length - 1),
        r = (t) => t.slice(0, t.length - 1),
        o = a(`x${e}`);
      o[""] = n;
      (a(`l${r(e)}`)[i(e)] = o),
        t(e).forEach((t) => {
          ["l", "x"].forEach((n) => {
            a(n + r(t))[i(t)] = a(n + e);
          });
        });
    }),
    Object.entries(Q).forEach(([t, e]) => {
      a(t)[""] = e;
    }),
    [...Object.keys(B), "c", "y", "w", "j"].forEach((t) => {
      const a = n[t];
      a[t] = e(a);
    }),
    delete n.n.n,
    Object.freeze(JSON.parse(JSON.stringify(n)))
  );
}
function getRomajiToKanaTree() {
  return null == Z && (Z = createRomajiToKanaMap$1()), Z;
}
function IME_MODE_MAP(t) {
  const e = JSON.parse(JSON.stringify(t));
  return (e.n.n = { "": "\u3093" }), (e.n[" "] = { "": "\u3093" }), e;
}
function isCharUpperCase(t = "") {
  return !isEmpty(t) && isCharInRange(t, CAPITAL_A, CAPITAL_Z);
}
function isCharLongDash(t = "") {
  return !isEmpty(t) && t.charCodeAt(0) === LONG_DASH;
}
function isCharSlashDot(t = "") {
  return !isEmpty(t) && t.charCodeAt(0) === SLASH_DOT;
}
function isCharHiragana(t = "") {
  return (
    !isEmpty(t) && (!!isCharLongDash(t) || isCharInRange(t, HIRA_A, HIRA_KE))
  );
}
function hiraganaToKatakana(t = "") {
  const e = [];
  return (
    t.split("").forEach((t) => {
      if (isCharLongDash(t) || isCharSlashDot(t)) e.push(t);
      else if (isCharHiragana(t)) {
        const n = t.charCodeAt(0) + (KATA_A - HIRA_A),
          a = String.fromCharCode(n);
        e.push(a);
      } else e.push(t);
    }),
    e.join("")
  );
}
function toKana(t = "", n = {}, a) {
  let i;
  return (
    a
      ? (i = n)
      : ((i = mergeWithDefaultOptions(n)),
        (a = et(i.IMEMode, i.useObsoleteKana, i.customKanaMapping))),
    splitIntoConvertedKana(t, i, a)
      .map((n) => {
        const [a, r, o] = n;
        if (null === o) return t.slice(a);
        const s = i.IMEMode === TO_KANA_METHODS.HIRAGANA,
          u =
            i.IMEMode === TO_KANA_METHODS.KATAKANA ||
            [...t.slice(a, r)].every(isCharUpperCase);
        return s || !u ? o : hiraganaToKatakana(o);
      })
      .join("")
  );
}
function splitIntoConvertedKana(t = "", e = {}, n) {
  const { IMEMode: a, useObsoleteKana: i, customKanaMapping: r } = e;
  return n || (n = et(a, i, r)), applyMapping(t.toLowerCase(), n, !a);
}
function makeOnInput(t) {
  let e;
  const n = Object.assign({}, mergeWithDefaultOptions(t), {
      IMEMode: t.IMEMode || !0,
    }),
    a = et(n.IMEMode, n.useObsoleteKana, n.customKanaMapping),
    i = [...Object.keys(a), ...Object.keys(a).map((t) => t.toUpperCase())];
  return function ({ target: t }) {
    t.value !== e &&
      "true" !== t.dataset.ignoreComposition &&
      convertInput(t, n, a, i);
  };
}
function convertInput(t, e, n, a) {
  const [i, r, o] = splitInput(t.value, t.selectionEnd, a),
    s = toKana(r, e, n);
  if (r !== s) {
    const e = i.length + s.length,
      n = i + s + o;
    (t.value = n),
      o.length
        ? setTimeout(() => t.setSelectionRange(e, e), 1)
        : t.setSelectionRange(e, e);
  }
}
function onComposition({ type: t, target: e, data: n }) {
  /Mac/.test(window.navigator && window.navigator.platform) &&
    ("compositionupdate" === t &&
      isJapanese(n) &&
      (e.dataset.ignoreComposition = "true"),
    "compositionend" === t && (e.dataset.ignoreComposition = "false"));
}
function trackListeners(t, e, n) {
  nt = nt.concat({ id: t, inputHandler: e, compositionHandler: n });
}
function untrackListeners({ id: t }) {
  nt = nt.filter(({ id: e }) => e !== t);
}
function findListeners(t) {
  return t && nt.find(({ id: e }) => e === t.getAttribute("data-wanakana-id"));
}
function splitInput(t = "", e = 0, n = []) {
  let a, i, r;
  return (
    0 === e && n.includes(t[0])
      ? ([a, i, r] = workFromStart(t, n))
      : e > 0
      ? ([a, i, r] = workBackwards(t, e))
      : (([a, i] = takeWhileAndSlice(t, (t) => !n.includes(t))),
        ([i, r] = takeWhileAndSlice(i, (t) => !isJapanese(t)))),
    [a, i, r]
  );
}
function workFromStart(t, e) {
  return [
    "",
    ...takeWhileAndSlice(t, (t) => e.includes(t) || !isJapanese(t, /[0-9]/)),
  ];
}
function workBackwards(t = "", e = 0) {
  const [n, a] = takeWhileAndSlice(
    [...t.slice(0, e)].reverse(),
    (t) => !isJapanese(t)
  );
  return [a.reverse().join(""), n.split("").reverse().join(""), t.slice(e)];
}
function takeWhileAndSlice(t = {}, e = (t) => !!t) {
  const n = [],
    { length: a } = t;
  let i = 0;
  for (; i < a && e(t[i], i); ) n.push(t[i]), (i += 1);
  return [n.join(""), t.slice(i)];
}
function bind(t = {}, e = {}, n = !1) {
  if (!ot.includes(t.nodeName))
    throw new Error(
      `Element provided to Wanakana bind() was not a valid input or textarea element.\n Received: (${JSON.stringify(
        t
      )})`
    );
  if (t.hasAttribute("data-wanakana-id")) return;
  const a = makeOnInput(e),
    i = newId(),
    r = {};
  [
    { name: "data-wanakana-id", value: i },
    { name: "lang", value: "ja" },
    { name: "autoCapitalize", value: "none" },
    { name: "autoCorrect", value: "off" },
    { name: "autoComplete", value: "off" },
    { name: "spellCheck", value: "false" },
  ].forEach((e) => {
    (r[e.name] = t.getAttribute(e.name)), t.setAttribute(e.name, e.value);
  }),
    (t.dataset.previousAttributes = JSON.stringify(r)),
    t.addEventListener("input", a),
    t.addEventListener("compositionupdate", onComposition),
    t.addEventListener("compositionend", onComposition),
    trackListeners(i, a, onComposition),
    !0 === n && addDebugListeners(t);
}
function unbind(t, e = !1) {
  const n = findListeners(t);
  if (null == n)
    throw new Error(
      `Element provided to Wanakana unbind() had no listener registered.\n Received: ${JSON.stringify(
        t
      )}`
    );
  const { inputHandler: a, compositionHandler: i } = n,
    r = JSON.parse(t.dataset.previousAttributes);
  Object.keys(r).forEach((e) => {
    r[e] ? t.setAttribute(e, r[e]) : t.removeAttribute(e);
  }),
    t.removeAttribute("data-previous-attributes"),
    t.removeAttribute("data-ignore-composition"),
    t.removeEventListener("input", a),
    t.removeEventListener("compositionstart", i),
    t.removeEventListener("compositionupdate", i),
    t.removeEventListener("compositionend", i),
    untrackListeners(n),
    !0 === e && removeDebugListeners(t);
}
function isCharRomaji(t = "") {
  return !isEmpty(t) && ROMAJI_POINTS.some(([e, n]) => isCharInRange(t, e, n));
}
function isRomaji(t = "", e) {
  const n = "regexp" === typeOf(e);
  return (
    !isEmpty(t) &&
    [...t].every((t) => {
      const a = isCharRomaji(t);
      return n ? a || e.test(t) : a;
    })
  );
}
function isCharKatakana(t = "") {
  return isCharInRange(t, KATA_A, LONG_DASH);
}
function isCharKana(t = "") {
  return !isEmpty(t) && (isCharHiragana(t) || isCharKatakana(t));
}
function isKana(t = "") {
  return !isEmpty(t) && [...t].every(isCharKana);
}
function isHiragana(t = "") {
  return !isEmpty(t) && [...t].every(isCharHiragana);
}
function isKatakana(t = "") {
  return !isEmpty(t) && [...t].every(isCharKatakana);
}
function isCharKanji(t = "") {
  return isCharInRange(t, KANJI_ONE, KANJI_LAST);
}
function isKanji(t = "") {
  return !isEmpty(t) && [...t].every(isCharKanji);
}
function isMixed(t = "", e = { passKanji: !0 }) {
  const n = [...t];
  let a = !1;
  return (
    e.passKanji || (a = n.some(isKanji)),
    (n.some(isHiragana) || n.some(isKatakana)) && n.some(isRomaji) && !a
  );
}
function katakanaToHiragana(
  t = "",
  e,
  { isDestinationRomaji: n, convertLongVowelMark: a } = {}
) {
  let i = "";
  return t
    .split("")
    .reduce((r, o, s) => {
      if (isCharSlashDot(o) || isCharInitialLongDash(o, s) || isKanaAsSymbol(o))
        return r.concat(o);
      if (a && i && isCharInnerLongDash(o, s)) {
        const a = e(i).slice(-1);
        return isCharKatakana(t[s - 1]) && "o" === a && n
          ? r.concat("\u304a")
          : r.concat(it[a]);
      }
      if (!isCharLongDash(o) && isCharKatakana(o)) {
        const t = o.charCodeAt(0) + (HIRA_A - KATA_A),
          e = String.fromCharCode(t);
        return (i = e), r.concat(e);
      }
      return (i = ""), r.concat(o);
    }, [])
    .join("");
}
function getKanaToHepburnTree() {
  return null == st && (st = createKanaToHepburnMap()), st;
}
function getKanaToRomajiTree(t) {
  return t === ROMANIZATIONS.HEPBURN ? getKanaToHepburnTree() : {};
}
function createKanaToHepburnMap() {
  const t = transform(hiraganaToRomajiMap),
    e = (e) => getSubTreeOf(t, e),
    n = (t, n) => {
      e(t)[""] = n;
    };
  return (
    Object.entries(specialCharMap).forEach(([t, n]) => {
      e(t)[""] = n;
    }),
    [...Object.entries(smallYaMap), ...Object.entries(smallVowelMap)].forEach(
      ([t, e]) => {
        n(t, e);
      }
    ),
    iVowelList.forEach((t) => {
      const a = e(t)[""][0];
      Object.entries(smallYaMap).forEach(([e, i]) => {
        n(t + e, a + i);
      }),
        Object.entries(ySmallVowelMap).forEach(([e, i]) => {
          n(t + e, a + i);
        });
    }),
    Object.entries(shijiMap).forEach(([t, e]) => {
      Object.entries(smallYaMap).forEach(([a, i]) => {
        n(t + a, e + i[1]);
      }),
        n(`${t}\u3043`, `${e}yi`),
        n(`${t}\u3047`, `${e}e`);
    }),
    (t["\u3063"] = resolveTsu(t)),
    Object.entries(smallKanaMap).forEach(([t, e]) => {
      n(t, e);
    }),
    vowels.forEach((t) => {
      n(`\u3093${t}`, `n'${e(t)[""]}`);
    }),
    Object.freeze(JSON.parse(JSON.stringify(t)))
  );
}
function resolveTsu(t) {
  return Object.entries(t).reduce((t, [e, n]) => {
    if (e) t[e] = resolveTsu(n);
    else {
      const a = n.charAt(0);
      t[e] = Object.keys(validRomajiSet).includes(a)
        ? validRomajiSet[a] + n
        : n;
    }
    return t;
  }, {});
}
function toRomaji(t = "", e = {}, n) {
  const a = mergeWithDefaultOptions(e);
  return (
    n || (n = memoizedMap(a.romanization, a.customRomajiMapping)),
    splitIntoRomaji(t, a, n)
      .map((e) => {
        const [n, i, r] = e;
        return a.upcaseKatakana && isKatakana(t.slice(n, i))
          ? r.toUpperCase()
          : r;
      })
      .join("")
  );
}
function splitIntoRomaji(t, e, n) {
  n || (n = memoizedMap(e.romanization, e.customRomajiMapping));
  return applyMapping(
    katakanaToHiragana(
      t,
      toRomaji,
      Object.assign({}, { isDestinationRomaji: !0 }, e)
    ),
    n,
    !e.IMEMode
  );
}
function isCharEnglishPunctuation(t = "") {
  return (
    !isEmpty(t) && ENGLISH_PUNCT_POINTS.some(([e, n]) => isCharInRange(t, e, n))
  );
}
function toHiragana(t = "", e = {}) {
  const n = mergeWithDefaultOptions(e);
  if (n.passRomaji) return katakanaToHiragana(t, toRomaji, n);
  if (isMixed(t, { passKanji: !0 })) {
    return toKana(katakanaToHiragana(t, toRomaji, n).toLowerCase(), n);
  }
  return isRomaji(t) || isCharEnglishPunctuation(t)
    ? toKana(t.toLowerCase(), n)
    : katakanaToHiragana(t, toRomaji, n);
}
function toKatakana(t = "", e = {}) {
  const n = mergeWithDefaultOptions(e);
  if (n.passRomaji) return hiraganaToKatakana(t);
  if (isMixed(t) || isRomaji(t) || isCharEnglishPunctuation(t)) {
    return hiraganaToKatakana(toKana(t.toLowerCase(), n));
  }
  return hiraganaToKatakana(t);
}
function isCharJapanesePunctuation(t = "") {
  return (
    !isEmpty(t) && JAPANESE_PUNCTUATION.some(([e, n]) => isCharInRange(t, e, n))
  );
}
function getType(t, e = !1) {
  const {
    EN: n,
    JA: a,
    EN_NUM: i,
    JA_NUM: r,
    EN_PUNC: o,
    JA_PUNC: s,
    KANJI: u,
    HIRAGANA: c,
    KATAKANA: p,
    SPACE: l,
    OTHER: f,
  } = CHAR_TYPE;
  if (e)
    switch (!0) {
      case isCharJaNum(t):
      case isCharEnNum(t):
        return f;
      case isCharEnSpace(t):
        return n;
      case isCharEnglishPunctuation(t):
        return f;
      case isCharJaSpace(t):
        return a;
      case isCharJapanesePunctuation(t):
        return f;
      case isCharJapanese(t):
        return a;
      case isCharRomaji(t):
        return n;
      default:
        return f;
    }
  else
    switch (!0) {
      case isCharJaSpace(t):
      case isCharEnSpace(t):
        return l;
      case isCharJaNum(t):
        return r;
      case isCharEnNum(t):
        return i;
      case isCharEnglishPunctuation(t):
        return o;
      case isCharJapanesePunctuation(t):
        return s;
      case isCharKanji(t):
        return u;
      case isCharHiragana(t):
        return c;
      case isCharKatakana(t):
        return p;
      case isCharJapanese(t):
        return a;
      case isCharRomaji(t):
        return n;
      default:
        return f;
    }
}
function tokenize(t, { compact: e = !1, detailed: n = !1 } = {}) {
  if (null == t || isEmpty(t)) return [];
  const a = [...t];
  let i = a.shift(),
    r = getType(i, e);
  i = n ? { type: r, value: i } : i;
  const o = a.reduce(
    (t, a) => {
      const i = getType(a, e),
        o = i === r;
      r = i;
      let s = a;
      return (
        o && (s = (n ? t.pop().value : t.pop()) + s),
        n ? t.concat({ type: i, value: s }) : t.concat(s)
      );
    },
    [i]
  );
  return o;
}
function stripOkurigana(t = "", { leading: e = !1, matchKanji: n = "" } = {}) {
  if (
    !isJapanese(t) ||
    isLeadingWithoutInitialKana(t, e) ||
    isTrailingWithoutFinalKana(t, e) ||
    isInvalidMatcher(t, n)
  )
    return t;
  const a = n || t,
    i = new RegExp(e ? `^${tokenize(a).shift()}` : `${tokenize(a).pop()}$`);
  return t.replace(i, "");
}
const version = "5.1.0",
  TO_KANA_METHODS = { HIRAGANA: "toHiragana", KATAKANA: "toKatakana" },
  ROMANIZATIONS = { HEPBURN: "hepburn" },
  DEFAULT_OPTIONS = {
    useObsoleteKana: !1,
    passRomaji: !1,
    upcaseKatakana: !1,
    IMEMode: !1,
    convertLongVowelMark: !0,
    romanization: ROMANIZATIONS.HEPBURN,
  },
  CAPITAL_A = 65,
  CAPITAL_Z = 90,
  HIRA_A = 12353,
  HIRA_KE = 12438,
  KATA_A = 12449,
  KANJI_ONE = 19968,
  KANJI_LAST = 40879,
  LONG_DASH = 12540,
  SLASH_DOT = 12539,
  JAPANESE_PUNCTUATION = [
    [12288, 12351],
    [65377, 65381],
    [12539, 12540],
    [65281, 65295],
    [65306, 65311],
    [65339, 65343],
    [65371, 65376],
    [65504, 65518],
  ],
  JAPANESE_POINTS = [
    [12352, 12447],
    [12448, 12543],
    [65377, 65381],
    [65382, 65439],
    ...JAPANESE_PUNCTUATION,
    [65313, 65338],
    [65345, 65370],
    [65296, 65305],
    [19968, 40959],
    [13312, 19903],
  ],
  ROMAJI_POINTS = [
    [0, 127],
    [256, 257],
    [274, 275],
    [298, 299],
    [332, 333],
    [362, 363],
  ],
  ENGLISH_PUNCT_POINTS = [
    [32, 47],
    [58, 63],
    [91, 96],
    [123, 126],
    [8216, 8217],
    [8220, 8221],
  ];
var numberIsNaN =
    Number.isNaN ||
    function (t) {
      return "number" == typeof t && t != t;
    },
  hasOwnProperty = Object.prototype.hasOwnProperty;
const mergeWithDefaultOptions = (t = {}) =>
    Object.assign({}, DEFAULT_OPTIONS, t),
  _ = {
    a: "\u3042",
    i: "\u3044",
    u: "\u3046",
    e: "\u3048",
    o: "\u304a",
    k: { a: "\u304b", i: "\u304d", u: "\u304f", e: "\u3051", o: "\u3053" },
    s: { a: "\u3055", i: "\u3057", u: "\u3059", e: "\u305b", o: "\u305d" },
    t: { a: "\u305f", i: "\u3061", u: "\u3064", e: "\u3066", o: "\u3068" },
    n: { a: "\u306a", i: "\u306b", u: "\u306c", e: "\u306d", o: "\u306e" },
    h: { a: "\u306f", i: "\u3072", u: "\u3075", e: "\u3078", o: "\u307b" },
    m: { a: "\u307e", i: "\u307f", u: "\u3080", e: "\u3081", o: "\u3082" },
    y: { a: "\u3084", u: "\u3086", o: "\u3088" },
    r: { a: "\u3089", i: "\u308a", u: "\u308b", e: "\u308c", o: "\u308d" },
    w: { a: "\u308f", i: "\u3090", e: "\u3091", o: "\u3092" },
    g: { a: "\u304c", i: "\u304e", u: "\u3050", e: "\u3052", o: "\u3054" },
    z: { a: "\u3056", i: "\u3058", u: "\u305a", e: "\u305c", o: "\u305e" },
    d: { a: "\u3060", i: "\u3062", u: "\u3065", e: "\u3067", o: "\u3069" },
    b: { a: "\u3070", i: "\u3073", u: "\u3076", e: "\u3079", o: "\u307c" },
    p: { a: "\u3071", i: "\u3074", u: "\u3077", e: "\u307a", o: "\u307d" },
    v: {
      a: "\u3094\u3041",
      i: "\u3094\u3043",
      u: "\u3094",
      e: "\u3094\u3047",
      o: "\u3094\u3049",
    },
  },
  W = {
    ".": "\u3002",
    ",": "\u3001",
    ":": "\uff1a",
    "/": "\u30fb",
    "!": "\uff01",
    "?": "\uff1f",
    "~": "\u301c",
    "-": "\u30fc",
    "\u2018": "\u300c",
    "\u2019": "\u300d",
    "\u201c": "\u300e",
    "\u201d": "\u300f",
    "[": "\uff3b",
    "]": "\uff3d",
    "(": "\uff08",
    ")": "\uff09",
    "{": "\uff5b",
    "}": "\uff5d",
  },
  B = {
    k: "\u304d",
    s: "\u3057",
    t: "\u3061",
    n: "\u306b",
    h: "\u3072",
    m: "\u307f",
    r: "\u308a",
    g: "\u304e",
    z: "\u3058",
    d: "\u3062",
    b: "\u3073",
    p: "\u3074",
    v: "\u3094",
    q: "\u304f",
    f: "\u3075",
  },
  G = { ya: "\u3083", yi: "\u3043", yu: "\u3085", ye: "\u3047", yo: "\u3087" },
  V = { a: "\u3041", i: "\u3043", u: "\u3045", e: "\u3047", o: "\u3049" },
  ADDITIONAL_MAPS = {
    sh: "sy",
    ch: "ty",
    cy: "ty",
    chy: "ty",
    shy: "sy",
    j: "zy",
    jy: "zy",
    shi: "si",
    chi: "ti",
    tsu: "tu",
    ji: "zi",
    fu: "hu",
  },
  X = Object.assign(
    { tu: "\u3063", wa: "\u308e", ka: "\u30f5", ke: "\u30f6" },
    V,
    G
  ),
  Q = {
    yi: "\u3044",
    wu: "\u3046",
    ye: "\u3044\u3047",
    wi: "\u3046\u3043",
    we: "\u3046\u3047",
    kwa: "\u304f\u3041",
    whu: "\u3046",
    tha: "\u3066\u3083",
    thu: "\u3066\u3085",
    tho: "\u3066\u3087",
    dha: "\u3067\u3083",
    dhu: "\u3067\u3085",
    dho: "\u3067\u3087",
  },
  Y = {
    wh: "\u3046",
    kw: "\u304f",
    qw: "\u304f",
    q: "\u304f",
    gw: "\u3050",
    sw: "\u3059",
    ts: "\u3064",
    th: "\u3066",
    tw: "\u3068",
    dh: "\u3067",
    dw: "\u3069",
    fw: "\u3075",
    f: "\u3075",
  };
let Z = null;
const tt = createCustomMapping({ wi: "\u3090", we: "\u3091" }),
  et = memoizeOne((t, e, n) => {
    let a = getRomajiToKanaTree();
    return (
      (a = t ? IME_MODE_MAP(a) : a),
      (a = e ? tt(a) : a),
      n && (a = mergeCustomMapping(a, n)),
      a
    );
  }, dequal);
let nt = [];
const onInput = ({
    target: { value: t, selectionStart: e, selectionEnd: n },
  }) => console.log("input:", { value: t, selectionStart: e, selectionEnd: n }),
  onCompositionStart = () => console.log("compositionstart"),
  onCompositionUpdate = ({
    target: { value: t, selectionStart: e, selectionEnd: n },
    data: a,
  }) =>
    console.log("compositionupdate", {
      data: a,
      value: t,
      selectionStart: e,
      selectionEnd: n,
    }),
  onCompositionEnd = () => console.log("compositionend"),
  compositionEvents = {
    input: onInput,
    compositionstart: onCompositionStart,
    compositionupdate: onCompositionUpdate,
    compositionend: onCompositionEnd,
  },
  addDebugListeners = (t) => {
    Object.entries(compositionEvents).forEach(([e, n]) =>
      t.addEventListener(e, n)
    );
  },
  removeDebugListeners = (t) => {
    Object.entries(compositionEvents).forEach(([e, n]) =>
      t.removeEventListener(e, n)
    );
  },
  ot = ["TEXTAREA", "INPUT"];
let rt = 0;
const newId = () => ((rt += 1), `${Date.now()}${rt}`),
  isCharInitialLongDash = (t, e) => isCharLongDash(t) && e < 1,
  isCharInnerLongDash = (t, e) => isCharLongDash(t) && e > 0,
  isKanaAsSymbol = (t) => ["\u30f6", "\u30f5"].includes(t),
  it = { a: "\u3042", i: "\u3044", u: "\u3046", e: "\u3048", o: "\u3046" };
let st = null;
const hiraganaToRomajiMap = {
    "\u3042": "a",
    "\u3044": "i",
    "\u3046": "u",
    "\u3048": "e",
    "\u304a": "o",
    "\u304b": "ka",
    "\u304d": "ki",
    "\u304f": "ku",
    "\u3051": "ke",
    "\u3053": "ko",
    "\u3055": "sa",
    "\u3057": "shi",
    "\u3059": "su",
    "\u305b": "se",
    "\u305d": "so",
    "\u305f": "ta",
    "\u3061": "chi",
    "\u3064": "tsu",
    "\u3066": "te",
    "\u3068": "to",
    "\u306a": "na",
    "\u306b": "ni",
    "\u306c": "nu",
    "\u306d": "ne",
    "\u306e": "no",
    "\u306f": "ha",
    "\u3072": "hi",
    "\u3075": "fu",
    "\u3078": "he",
    "\u307b": "ho",
    "\u307e": "ma",
    "\u307f": "mi",
    "\u3080": "mu",
    "\u3081": "me",
    "\u3082": "mo",
    "\u3089": "ra",
    "\u308a": "ri",
    "\u308b": "ru",
    "\u308c": "re",
    "\u308d": "ro",
    "\u3084": "ya",
    "\u3086": "yu",
    "\u3088": "yo",
    "\u308f": "wa",
    "\u3090": "wi",
    "\u3091": "we",
    "\u3092": "wo",
    "\u3093": "n",
    "\u304c": "ga",
    "\u304e": "gi",
    "\u3050": "gu",
    "\u3052": "ge",
    "\u3054": "go",
    "\u3056": "za",
    "\u3058": "ji",
    "\u305a": "zu",
    "\u305c": "ze",
    "\u305e": "zo",
    "\u3060": "da",
    "\u3062": "ji",
    "\u3065": "zu",
    "\u3067": "de",
    "\u3069": "do",
    "\u3070": "ba",
    "\u3073": "bi",
    "\u3076": "bu",
    "\u3079": "be",
    "\u307c": "bo",
    "\u3071": "pa",
    "\u3074": "pi",
    "\u3077": "pu",
    "\u307a": "pe",
    "\u307d": "po",
    "\u3094\u3041": "va",
    "\u3094\u3043": "vi",
    "\u3094": "vu",
    "\u3094\u3047": "ve",
    "\u3094\u3049": "vo",
  },
  specialCharMap = {
    "\u3002": ".",
    "\u3001": ",",
    "\uff1a": ":",
    "\u30fb": "/",
    "\uff01": "!",
    "\uff1f": "?",
    "\u301c": "~",
    "\u30fc": "-",
    "\u300c": "\u2018",
    "\u300d": "\u2019",
    "\u300e": "\u201c",
    "\u300f": "\u201d",
    "\uff3b": "[",
    "\uff3d": "]",
    "\uff08": "(",
    "\uff09": ")",
    "\uff5b": "{",
    "\uff5d": "}",
    "\u3000": " ",
  },
  vowels = [
    "\u3042",
    "\u3044",
    "\u3046",
    "\u3048",
    "\u304a",
    "\u3084",
    "\u3086",
    "\u3088",
  ],
  smallYaMap = { "\u3083": "ya", "\u3085": "yu", "\u3087": "yo" },
  ySmallVowelMap = { "\u3043": "yi", "\u3047": "ye" },
  smallVowelMap = {
    "\u3041": "a",
    "\u3043": "i",
    "\u3045": "u",
    "\u3047": "e",
    "\u3049": "o",
  },
  iVowelList = [
    "\u304d",
    "\u306b",
    "\u3072",
    "\u307f",
    "\u308a",
    "\u304e",
    "\u3073",
    "\u3074",
    "\u3094",
    "\u304f",
    "\u3075",
  ],
  shijiMap = { "\u3057": "sh", "\u3061": "ch", "\u3058": "j", "\u3062": "j" },
  smallKanaMap = {
    "\u3063": "",
    "\u3083": "ya",
    "\u3085": "yu",
    "\u3087": "yo",
    "\u3041": "a",
    "\u3043": "i",
    "\u3045": "u",
    "\u3047": "e",
    "\u3049": "o",
  },
  validRomajiSet = {
    b: "b",
    c: "t",
    d: "d",
    f: "f",
    g: "g",
    h: "h",
    j: "j",
    k: "k",
    m: "m",
    p: "p",
    q: "q",
    r: "r",
    s: "s",
    t: "t",
    v: "v",
    w: "w",
    x: "x",
    z: "z",
  },
  memoizedMap = memoizeOne((t, e) => {
    let n = getKanaToRomajiTree(t);
    return e && (n = mergeCustomMapping(n, e)), n;
  }, dequal),
  isCharEnSpace = (t) => " " === t,
  isCharJaSpace = (t) => "\u3000" === t,
  isCharJaNum = (t) => /[\uff10-\uff19]/.test(t),
  isCharEnNum = (t) => /[0-9]/.test(t),
  CHAR_TYPE = {
    EN: "en",
    JA: "ja",
    EN_NUM: "englishNumeral",
    JA_NUM: "japaneseNumeral",
    EN_PUNC: "englishPunctuation",
    JA_PUNC: "japanesePunctuation",
    KANJI: "kanji",
    HIRAGANA: "hiragana",
    KATAKANA: "katakana",
    SPACE: "space",
    OTHER: "other",
  },
  isLeadingWithoutInitialKana = (t, e) => e && !isKana(t[0]),
  isTrailingWithoutFinalKana = (t, e) => !e && !isKana(t[t.length - 1]),
  isInvalidMatcher = (t, e) =>
    (e && ![...e].some(isKanji)) || (!e && isKana(t));
export {
  ROMANIZATIONS as ROMANIZATIONS,
  TO_KANA_METHODS as TO_KANA_METHODS,
  version as VERSION,
  bind,
  isHiragana,
  isJapanese,
  isKana,
  isKanji,
  isKatakana,
  isMixed,
  isRomaji,
  stripOkurigana,
  toHiragana,
  toKana,
  toKatakana,
  toRomaji,
  tokenize,
  unbind,
};
