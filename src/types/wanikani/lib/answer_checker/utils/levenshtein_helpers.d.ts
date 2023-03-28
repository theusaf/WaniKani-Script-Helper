declare module "lib/answer_checker/utils/levenshtein_helpers" {
  /**
   * Gets a tolerance for the Levenshtein distance based on the length of the input.
   *
   * @param input
   */
  export function getLevenshteinTolerance(input: string): number;

  /**
   * Calculates the Levenshtein distance between two strings.
   *
   * @param input
   * @param input2
   */
  export function getLevenshteinDistance(input: string, input2: string): number;
}
