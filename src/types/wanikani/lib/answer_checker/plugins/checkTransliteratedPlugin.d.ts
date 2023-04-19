declare module "lib/answer_checker/plugins/checkTransliteratedPlugin" {
  import { PluginArguments } from "lib/answer_checker/answer_checker";

  /**
   * Checks for readings entered during a meaning question.
   * If the subject has a reading that is the same as the answer, it will return a warning.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkTransliterated(
    input: PluginArguments
  ): string | null;
}
