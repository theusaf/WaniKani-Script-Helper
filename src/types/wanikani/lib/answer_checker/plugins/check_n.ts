declare module "lib/answer_checker/plguins/check_n" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";

  export type PermutationFunction = (list: string[]) => string[];

  export class CheckN extends Plugin {
    get readingsContainingN(): string[];
    _readingsContainingN: string[];

    findIndexOfReadingWithTooFewNs(): number;
    findIndexOfReadingWithTooManyNs(): number;
    findIndexOfReadingMatchingPermutations(func: PermutationFunction): number;
  }
}
