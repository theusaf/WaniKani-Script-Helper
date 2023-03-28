declare module "lib/answer_checker/plugins/checkTransliteratedPlugin" {
  import { Subject } from "events/did_answer_question";

  /**
   * Checks for readings entered during a meaning question.
   * If the subject has a reading that is the same as the answer, it will return a warning.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkTransliterated(
    questionType: "meaning" | "reading",
    answer: string,
    subject: Subject
  ): string | null;
}
