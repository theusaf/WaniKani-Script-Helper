declare module "lib/answer_checker_plugins/checkSmallHiraganaPlugin" {
  import { Subject } from "events/did_answer_question";
  /**
   * Checks if the answer contains the large kana when it should be small.
   * Will create a warning if so.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkSmallHiragana(
    questionType: "meaning" | "reading",
    answer: string,
    subject: Subject
  ): true | null;
}
