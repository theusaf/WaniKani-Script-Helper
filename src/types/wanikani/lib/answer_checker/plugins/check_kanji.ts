declare module "lib/answer_checker/plugins/check_kanji" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";

  /**
   * Checks if the answer is the kanji.
   * Will create a warning if so.
   */
  export class CheckKanji extends Plugin {}
}
