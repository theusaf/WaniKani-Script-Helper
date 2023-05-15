declare module "lib/answer_checker/plugins/check_warning_list" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";
  import {
    AuxiliaryMeaning,
    AuxiliaryReading,
  } from "events/did_answer_question";
  export class CheckWarningList extends Plugin {
    get warningList(): (AuxiliaryMeaning | AuxiliaryReading)[];
  }
}
