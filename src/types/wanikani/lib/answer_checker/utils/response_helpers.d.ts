declare module "lib/answer_checker/utils/response_helpers" {
  /**
   * Replaces single 'n's with 'ん' and removes whitespace.
   *
   * @param response
   */
  export function normalizeReadingResponse(response: string): string;

  /**
   * Strips extra whitespace and punctuation, and converts text to lowercase.
   *
   * @param response
   */
  export function normalizeResponse(response: string): string;

  /**
   * Checks if the text contains any japanese characters.
   *
   * @param text
   */
  export function isKanaPresent(text: string): boolean;

  /**
   * Checks if the text contains any non-japanese characters.
   *
   * @param text
   */
  export function isNonKanaPresent(text: string): boolean;

  /**
   * Verifies that the response characters match the question type.
   *
   * @param questionType
   * @param response
   */
  export function questionTypeAndResponseMatch(
    questionType: "meaning" | "reading",
    response: string
  ): boolean;
}
