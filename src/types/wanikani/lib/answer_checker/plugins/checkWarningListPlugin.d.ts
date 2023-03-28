declare module "lib/answer_checker/plugins/checkWarningListPlugin" {
  import { Subject } from "events/did_answer_question";

  /**
   * Checks if there is a specific warning for the answer.
   * If so, it will return the warning.
   * This is used for things like WaniKani changing which reading to use.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkWarningList(
    questionType: "meaning" | "reading",
    answer: string,
    subject: Subject
  ): string | null;
}
