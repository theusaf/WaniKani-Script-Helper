declare module "lib/answer_checker/plugins/check_transliterated" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";
  export class CheckTransliterated extends Plugin {
    get hasMatchedReading(): boolean;
    get hasMatchedMeaning(): boolean;
  }
}
