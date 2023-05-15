declare module "lib/answer_checker/check_kanji_does_not_start_with_to" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";
  export class CheckKanjiDoesNotStartWithTo extends Plugin {
    get hasMatchedMeaning(): boolean;
  }
}
