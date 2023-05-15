declare module "lib/answer_checker/plugins/check_that_verb_starts_with_to" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";

  export class CheckThatVerbStartsWithTo extends Plugin {
    findMatchedMeaning(): string;
  }
}
