declare module "lib/answer_checker/plugins/check_impossible_kana" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";

  export class CheckImpossibleKana extends Plugin {
    get containsImpossibleKana(): boolean;
    get containsInvalidSmallYaYuYo(): boolean;
    get containsInvalidSmallTSU(): boolean;
    get containsInvalidAdjacentCharacters(): boolean;
    get containsInvalidStartingCharacter(): boolean;
  }
}
