declare module "lib/answer_checker/plugins/check_long_dash" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";

  export class CheckLongDash extends Plugin {
    get matchedLongDashReading(): string | null;
    containsLongDash(input: string): boolean;
    reponseMatchesConvertedReading(input: string): boolean;
    convertDashesToVowels(input: string): string;
    vowelsMatch(a: string, b: string, c: string): boolean;
    charactersMatchWithTypos(
      a: string,
      b: string,
      c: string,
      i: number
    ): boolean;
  }
}
