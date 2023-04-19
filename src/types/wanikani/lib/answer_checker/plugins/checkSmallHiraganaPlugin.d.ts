declare module "lib/answer_checker_plugins/checkSmallHiraganaPlugin" {
  import { PluginArguments } from "lib/answer_checker/answer_checker";
  /**
   * Checks if the answer contains the large kana when it should be small.
   * Will create a warning if so.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkSmallHiragana(
    input: PluginArguments
  ): string | null;
}
