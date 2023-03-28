declare module "lib/answer_checker/plugins/checkThatVerbStartsWithToPlugin" {
  import { Subject } from "events/did_answer_question";

  /**
   * Checks that verb answers start with 'to'.
   * If it doesn't, it will return a warning.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkThatVerbStartsWithTo(
    questionType: "meaning" | "reading",
    answer: string,
    subject: Subject
  ): string | null;
}
