class ImpossibleKanaValidator {
  constructor(a) {
    this.response = a;
  }
  get containsInvalidSmallYaYuYo() {
    return (
      -1 !==
      this.response.search(
        /[^\u304d\u3057\u3061\u306b\u3072\u307f\u308a\u304e\u3058\u3062\u3073\u3074\u30ad\u30b7\u30c1\u30cb\u30d2\u30df\u30ea\u30ae\u30b8\u30c2\u30d3\u30d4][\u3083\u3085\u3087\u30e3\u30e5\u30e7]/
      )
    );
  }
  get containsInvalidSmallTSU() {
    return (
      -1 !==
      this.response.search(
        /[\u3063\u30c3][\u3042\u3044\u3046\u3048\u304a\u3083\u3085\u3087\u3041\u3043\u3045\u3047\u3049\u30a2\u30a4\u30a6\u30a8\u30aa\u30e3\u30e5\u30e7\u30a1\u30a3\u30a5\u30a7\u30a9]/
      )
    );
  }
  get containsInvalidAdjacentCharacters() {
    return (
      -1 !== this.response.search(/(\u3093\u3093|\u30f3\u30f3)/) ||
      /[\u3093\u3083\u3085\u3087\u3041\u3043\u3045\u3047\u3049\u30f3\u30e3\u30e5\u30e7\u30a1\u30a3\u30a5\u30a7\u30a9][\u3083\u3085\u3087\u3041\u3043\u3045\u3047\u3049\u30e3\u30e5\u30e7\u30a1\u30a3\u30a5\u30a7\u30a9]/.test(
        this.response
      )
    );
  }
  get containsInvalidStartingCharacter() {
    return /^[\u3093\u3083\u3085\u3087\u3041\u3043\u3045\u3047\u3049\u3063\u30f3\u30e3\u30e5\u30e7\u30a1\u30a3\u30a5\u30a7\u30a9\u30c3]/.test(
      this.response
    );
  }
  get containsImposssibleKana() {
    return (
      this.containsInvalidStartingCharacter ||
      this.containsInvalidAdjacentCharacters ||
      this.containsInvalidSmallTSU ||
      this.containsInvalidSmallYaYuYo
    );
  }
}
const shouldNotCheck = (a, s) => a.passed || "meaning" === s;
export default function checkImpossibleKana({
  questionType: a,
  response: s,
  result: t,
}) {
  if (shouldNotCheck(t, a)) return null;
  let n = null;
  window.ImpossibleKanaValidator = ImpossibleKanaValidator;
  return (
    new ImpossibleKanaValidator(s).containsImposssibleKana &&
      (n = "That looks like a typo. Do you want to retry?"),
    n
  );
}
