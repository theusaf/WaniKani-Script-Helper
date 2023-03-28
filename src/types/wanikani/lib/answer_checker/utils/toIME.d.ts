declare module "lib/answer_checker/utils/toIME" {
  /**
   * Converts a string to IME format.
   * - Converts katakana and hiragana to romaji
   * - ん and ン are converted to nn
   * - ー is converted to -
   *
   * @param input
   */
  export default function toIME(input: string): string;
}
