import { Subject } from "events/did_answer_question";

declare module "lib/answer_checker/plugins/checkLongDashPlugin" {
  /**
   * Checks for dashes in the answer.
   * If the subject uses dashes, and the answer is only missin the dashes
   * then it will return a warning.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkLongDash(
    questionType: "meaning" | "reading",
    answer: string,
    subject: Subject
  ): string | null;
}
