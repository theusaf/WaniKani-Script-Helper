declare module "lib/answer_checker/plguins/checkNPlugin" {
  import { Subject } from "events/did_answer_question";

  /**
   * Checks for ambiguous 'n' in the answer.
   * If there is an ambiguous 'n' in the answer, it will return a warning.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkNPlugin(
    questionType: "meaning" | "reading",
    answer: string,
    subject: Subject
  ): string | null;
}
