const JAPANESE_PUNCTUATION_POINTS = [
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
    ...JAPANESE_PUNCTUATION_POINTS,
    [65313, 65338],
    [65345, 65370],
    [65296, 65305],
    [19968, 40959],
    [13312, 19903],
  ],
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
  HIRAGANA_TREE = {
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
  HIRAGANA_I_MAP = {
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
  HIRAGANA_SMALL_Y_MAP = {
    ya: "\u3083",
    yi: "\u3043",
    yu: "\u3085",
    ye: "\u3047",
    yo: "\u3087",
  },
  SPECIAL_CHAR_MAP = {
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
  OTHER_PHONETIC_MAP = {
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
  },
  SMALL_HIRAGANA_VOWEL_MAP = {
    a: "\u3041",
    i: "\u3043",
    u: "\u3045",
    e: "\u3047",
    o: "\u3049",
  },
  EXTENDED_SMALL_HIRAGANA_MAP = Object.assign(
    { tu: "\u3063", wa: "\u308e", ka: "\u30f5", ke: "\u30f6" },
    SMALL_HIRAGANA_VOWEL_MAP,
    HIRAGANA_SMALL_Y_MAP
  ),
  COMBINATION_HIRAGANA_MAP = {
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
  };

export function typeOf(object: any): string {
  return null === object
    ? "null"
    : object !== Object(object)
    ? typeof object
    : {}.toString.call(object).slice(8, -1).toLowerCase();
}
export function isEmpty(object: any) {
  return typeOf(object) !== "string" || object.length === 0;
}
export function isCharInRange(char = "", start: number, end: number) {
  if (isEmpty(char)) return false;
  const code = char.charCodeAt(0);
  return code >= start && code <= end;
}
export function isCharJapanese(char = "") {
  return JAPANESE_POINTS.some(([start, end]) =>
    isCharInRange(char, start, end)
  );
}
export function isJapanese(text = "", regex?: RegExp) {
  const isRegexProvided = typeOf(regex) === "regexp";
  if (isEmpty(text)) return false;
  return [...text].every((char) => {
    const check = isCharJapanese(char);
    return isRegexProvided ? check || regex.test(char) : check;
  });
}
export function isEqual(a: number, b: number) {
  return a === b || (Number.isNaN(a) && Number.isNaN(b));
}
export function areInputsEqual(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!isEqual(a[i], b[i])) return false;
  }
  return true;
}
// taken from original memoize-one
type MemoizeFunction = (...args: any) => any;
function memoizeOne(func: MemoizeFunction, func2: MemoizeFunction) {
  let storage: any = null;
  if (typeof func2 === "undefined") func2 = areInputsEqual;
  function memoizer() {
    const list = [];
    for (let i = 0; i < arguments.length; i++) list[i] = arguments[i];
    if (storage && storage.lastThis === this && func2(list, storage.lastArgs))
      return storage.lastResult;
    const result = func.apply(this, list);
    return (
      (storage = { lastResult: result, lastArgs: list, lastThis: this }), result
    );
  }
  memoizer.clear = function () {
    storage = null;
  };
  return memoizer;
}
export function find(a: any, b: any) {
  for (const key of a.keys()) {
    if (dequal(key, b)) return key;
  }
}
export function dequal(a: any, b: any) {
  if (a === b) return true;
  const constructor = a.constructor;
  if (a && b && a.constructor === b.constructor) {
    if (constructor === Date) return a.getTime() === b.getTime();
    if (constructor === RegExp) return a.toString() === b.toString();
    if (constructor === Array) {
      let length = a.length;
      if (a.length === b.length) {
        for (; length-- && dequal(a[length], b[length]); );
      }
      return length === -1;
    }
    if (constructor === Set) {
      if (a.size !== b.size) return false;
      for (const item of a) {
        let temp = item;
        if (temp && typeof temp === "object" && !(temp = find(b, temp)))
          return false;
        if (!b.has(temp)) return false;
      }
      return true;
    }
    if (constructor === Map) {
      if (a.size !== b.size) return false;
      for (const item of a) {
        let temp = item;
        if (temp && typeof temp === "object" && !(temp = find(b, temp)))
          return false;
        if (!dequal(item[1], b.get(temp))) return false;
      }
      return true;
    }
    if (constructor === ArrayBuffer) {
      a = new Uint8Array(a);
      b = new Uint8Array(b);
    } else if (constructor === DataView) {
      let length = a.byteLength;
      if (a.byteLength === b.byteLength) {
        for (; length-- && a.getUint8(length) === b.getUint8(length); );
      }
      return length === -1;
    }
    if (ArrayBuffer.isView(a)) {
      let length = a.byteLength;
      if (a.byteLength === b.byteLength) {
        for (; length-- && (a as any)[length] === b[length]; );
      }
    }
    if (!constructor || typeof a === "object") {
      let i = 0;
      for (const item in a) {
        if (
          Object.hasOwnProperty.call(a, item) &&
          ++i &&
          !Object.hasOwnProperty.call(b, item)
        )
          return false;
        if (!(item in b) || !dequal(a[item], b[item])) return false;
      }
      return Object.keys(b).length === i;
    }
  }
  return a != a && b != b;
}
// these functions taken from the original source
// variable names may be incorrect
function applyMapping(in1: any, in2: any, flag: boolean) {
  function getOffset(input: any, index: number) {
    if (void 0 !== input[index])
      return Object.assign({ "": input[""] + index }, input[index]);
  }
  function copyMap(input: any, index: number): any {
    const firstChar = input.charAt(0);
    return executeMap(
      Object.assign({ "": firstChar }, map2[firstChar]),
      input.slice(1),
      index,
      index + 1
    );
  }
  function executeMap(in1: any, in2: any, start: number, end: number): any {
    if (!in2)
      return flag || 1 === Object.keys(in1).length
        ? in1[""]
          ? [[start, end, in1[""]]]
          : []
        : [[start, end, null]];
    if (1 === Object.keys(in1).length)
      return [[start, end, in1[""]]].concat(copyMap(in2, end));
    const offset = getOffset(in1, in2.charAt(0));
    return void 0 === offset
      ? [[start, end, in1[""]]].concat(copyMap(in2, end))
      : executeMap(offset, in2.slice(1), start, end + 1);
  }
  const map2 = in2;
  return copyMap(in1, 0);
}
function transform(obj: any) {
  return Object.entries(obj).reduce<Record<string, any>>(
    (prev, [key, value]) => {
      const isString = typeOf(value) === "string";
      if (isString) {
        prev[key] = { "": value };
      } else {
        prev[key] = transform(value);
      }
      return prev;
    },
    {}
  );
}
function getSubTreeOf(initial: any, text: string) {
  return text.split("").reduce((a, b) => {
    if (typeof a[b] !== "undefined") {
      a[b] = {};
    }
    return a[b];
  }, initial);
}
function createCustomMapping(obj: any = {}) {
  const tmp: Record<string, any> = {};
  if (typeof obj === "object") {
    Object.entries(obj).forEach(([key, value]) => {
      let tmp2 = tmp;
      key.split("").forEach((char) => {
        if (typeof tmp2[char] === "undefined") {
          tmp2[char] = {};
        }
        tmp2 = tmp2[char];
      });
      tmp2[""] = value;
    });
  }
  function combine(obj: any, obj2: any) {
    if (typeOf(obj) === "string" || typeof obj === "undefined") {
      return obj2;
    } else {
      return Object.entries(obj2).reduce((prev, [key, value]) => {
        prev[key] = combine(obj[key], value);
        return prev;
      }, obj);
    }
  }
  return function (obj: any) {
    return combine(JSON.parse(JSON.stringify(obj)), tmp);
  };
}
function mergeCustomMapping(obj: any, obj2: any) {
  if (obj2) {
    if (typeOf(obj2) === "function") {
      return obj2(obj);
    } else {
      return createCustomMapping(obj2)(obj);
    }
  } else {
    return obj;
  }
}
// This one is really big, so I'm just putting it here verbatim...
function createRomajiToKanaMap$1() {
  function t(t: string) {
    return [...Object.entries(ADDITIONAL_MAPS), ["c", "k"]].reduce(
      (e, [n, a]) => (t.startsWith(a) ? e.concat(t.replace(a, n)) : e),
      []
    );
  }
  function e(t: any): any {
    return Object.entries(t).reduce<any>(
      (t, [n, a]) => ((t[n] = n ? e(a) : `\u3063${a}`), t),
      {}
    );
  }
  const n = transform(HIRAGANA_TREE),
    a = (t: string) => getSubTreeOf(n, t);
  return (
    Object.entries(HIRAGANA_I_MAP).forEach(([t, e]) => {
      Object.entries(HIRAGANA_SMALL_Y_MAP).forEach(([n, i]) => {
        a(t + n)[""] = e + i;
      });
    }),
    Object.entries(SPECIAL_CHAR_MAP).forEach(([t, e]) => {
      a(t)[""] = e;
    }),
    Object.entries(OTHER_PHONETIC_MAP).forEach(([t, e]) => {
      Object.entries(SMALL_HIRAGANA_VOWEL_MAP).forEach(([n, i]) => {
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
    Object.entries(EXTENDED_SMALL_HIRAGANA_MAP).forEach(([e, n]) => {
      const i = (t: string) => t.charAt(t.length - 1),
        r = (t: string) => t.slice(0, t.length - 1),
        o = a(`x${e}`);
      o[""] = n;
      (a(`l${r(e)}`)[i(e)] = o),
        t(e).forEach((t) => {
          ["l", "x"].forEach((n) => {
            a(n + r(t))[i(t)] = a(n + e);
          });
        });
    }),
    Object.entries(COMBINATION_HIRAGANA_MAP).forEach(([t, e]) => {
      a(t)[""] = e;
    }),
    [...Object.keys(HIRAGANA_I_MAP), "c", "y", "w", "j"].forEach((t) => {
      const a = n[t];
      a[t] = e(a);
    }),
    delete n.n.n,
    Object.freeze(JSON.parse(JSON.stringify(n)))
  );
}
