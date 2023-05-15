declare module "lib/answer_checker/plugins/check_kanji_readings" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";

  export class CheckKanjiReadings extends Plugin {
    get answeredAlternateReading(): boolean;
  }
}
