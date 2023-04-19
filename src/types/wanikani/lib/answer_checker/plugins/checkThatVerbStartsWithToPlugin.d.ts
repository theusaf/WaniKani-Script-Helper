declare module "lib/answer_checker/plugins/checkThatVerbStartsWithToPlugin" {
  import { QuestionAnswerResults, Subject } from "events/did_answer_question";
  import { PluginArguments } from "lib/answer_checker/answer_checker";

  /**
   * Checks that verb answers start with 'to'.
   * If it doesn't, it will return a warning.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkThatVerbStartsWithTo(
    input: PluginArguments
  ): string | null;
}
