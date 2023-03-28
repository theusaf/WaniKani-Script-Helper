declare module "lib/answer_checker/plugins/checkSingleKanjiVocabPlugin" {
  import { Subject } from "events/did_answer_question";
  /**
   * Checks if the answer is the correct
   * answer for the wrong type (kanji/vocab).
   * Will create a warning if so.
   *
   * @param questionType
   * @param answer
   * @param subject
   */
  export default function checkSingleKanjiVocabPlugin(
    questionType: "meaning" | "reading",
    answer: string,
    subject: Subject
  ): string | null;
}
