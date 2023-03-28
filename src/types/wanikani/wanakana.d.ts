declare module "wanakana" {
  export const ROMANIZATIONS: {
    HEPBURN: "hepburn";
  };
  export const TO_KANA_METHODS: {
    HIRAGANA: "toHiragana";
    KATAKANA: "toKatakana";
  };
  export const VERSION: string;

  export interface WanaKanaOptions {
    useObsoleteKana?: boolean;
    passRomaji?: boolean;
    upcaseKatakana?: boolean;
    IMEMode?: boolean;
    convertLongVowelMark?: boolean;
    romanization?: typeof ROMANIZATIONS;
  }

  /**
   * Converts an input element into a WanaKana enabled input.
   *
   * @param element Bind to an input or textarea element
   * @param options Options to control behavior of the input editor
   * @param debug Whether to log debug messages to the console
   */
  export function bind(
    element?: HTMLInputElement | HTMLTextAreaElement,
    options?: WanaKanaOptions,
    debug?: boolean
  ): void;

  /**
   * Unbinds an input element from WanaKana.
   *
   * @param element The input element to unbind
   * @param debug Whether to log debug messages to the console
   */
  export function unbind(
    element: HTMLInputElement | HTMLTextAreaElement,
    debug?: boolean
  ): void;

  /**
   * Determines if a string is all hiragana.
   *
   * @param text The text to check
   */
  export function isHiragana(text?: string): boolean;

  /**
   * Determines if a string contains Japanese characters.
   *
   * @param text The text to check
   * @param alt A separate regex to use in addition to the default
   */
  export function isJapanese(text?: string, alt?: RegExp): boolean;

  /**
   * Determines if a string is all katakana and hiragana.
   *
   * @param text The text to check
   */
  export function isKana(text?: string): boolean;

  /**
   * Determines if a string is all katakana.
   *
   * @param text The text to check
   */
  export function isHiragana(text?: string): boolean;

  /**
   * Determines if a string is all katakana.
   *
   * @param text The text to check
   */
  export function isKatakana(text?: string): boolean;

  export interface IsMixedOptions {
    passKanji?: boolean;
  }
  /**
   * Determines if a string contains a mix of Japanese and Latin characters.
   *
   * @param text The text to check
   * @param options Options to allow kanji characters for consideration
   */
  export function isMixed(text?: string, options?: IsMixedOptions): boolean;

  /**
   * Determines if a string is all latin characters.
   *
   * @param text The text to check
   * @param alt A separate regex to use in addition to the default
   */
  export function isRomaji(text?: string, alt?: RegExp): boolean;

  export interface StripOkuriganaOptions {
    leading?: boolean;
    matchKanji?: string;
  }
  /**
   * Strips okurigana from a string of Japanese text.
   *
   * @param text The text to strip okurigana from
   * @param options Options to control how okurigana is stripped
   */
  export function stripOkurigana(
    text?: string,
    options?: StripOkuriganaOptions
  ): string;

  /**
   * Converts romaji and katakana to hiragana.
   *
   * @param text The text to convert
   * @param options Options to control the conversion
   */
  export function toHiragana(text?: string, options?: WanaKanaOptions): string;

  /**
   * Converts romaji and hiragana to katakana.
   *
   * @param text The text to convert
   * @param options Options to control the conversion
   */
  export function toKatakana(text?: string, options?: WanaKanaOptions): string;

  /**
   * Converts romaji to hiragana or katakana.
   *
   * @param text The text to convert
   * @param options Options to control the conversion
   * @param mergeDefaultOptions Whether to merge the default options with the provided options
   */
  export function toKana(
    text?: string,
    options?: WanaKanaOptions,
    mergeDefaultOptions?: boolean
  ): string;

  // This interface may be incorrect.
  export interface WanaKanaCharMap {
    (...args: any[]): any;
    clear(): void;
  }
  /**
   * Converts hiragana and katakana to romaji.
   *
   * @param text The text to convert
   * @param options Options to control the conversion
   * @param map (I don't know exactly what this is)
   */
  export function toRomaji(
    text?: string,
    options?: WanaKanaOptions,
    map?: object
  ): string;

  export interface TokenizeOptions {
    /**
     * When true, combines all japanese characters into a token.
     */
    compact?: boolean;
    /**
     * When true, returns an array of objects with the token type and value.
     */
    detailed?: boolean;
  }
  export interface DetailedTokenizeResult {
    type: "en" | "hiragana" | "katakana" | "kanji";
    value: string;
  }
  export interface CompactTokenizeResult {
    type: "en" | "ja";
    value: string;
  }
  /**
   * Converts a string into an array of tokens.
   *
   * @param text The text to tokenize
   */
  export function tokenize(text?: string): string[];
  /**
   * Converts a string into an array of tokens.
   *
   * @param text The text to tokenize
   * @param options Options to control the tokenization
   */
  export function tokenize(
    text?: string,
    options?: TokenizeOptions
  ): DetailedTokenizeResult[] | CompactTokenizeResult[];
}
