export const normalizeReadingResponse = (e) =>
  e.replace(/n/g, "\u3093").replace(/\s/g, "");
export const normalizeResponse = (e) =>
  e
    .trim()
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\.|,|'|\u2019|\/|:/g, "");
const isKanaPresent = (e) =>
    /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f]/.test(e),
  isNonKanaPresent = (e) => {
    const n = "n" === e[e.length - 1] ? e.slice(0, -1) : e;
    return /[^\u3040-\u309f\u30a0-\u30ff]/.test(n);
  };
export const questionTypeAndResponseMatch = (e, n) =>
  ("reading" === e && !isNonKanaPresent(n)) ||
  ("meaning" === e && !isKanaPresent(n));
