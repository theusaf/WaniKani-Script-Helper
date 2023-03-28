declare module "lib/answer_checker/plugins/checkKanjiPlugin" {
  import { Subject } from "events/did_answer_question";

  /**
   * Checks if the answer is the kanji.
   * Will create a warning if so.
   *
   * @param _ unused
   * @param answer
   * @param subject
   */
  export default function checkKanjiPlugin(
    _: any,
    answer: string,
    subject: Subject
  ): true | null;
}
