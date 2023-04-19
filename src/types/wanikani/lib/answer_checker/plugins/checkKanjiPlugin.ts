declare module "lib/answer_checker/plugins/checkKanjiPlugin" {
  import { PluginArguments } from "lib/answer_checker/answer_checker";

  /**
   * Checks if the answer is the kanji.
   * Will create a warning if so.
   */
  export default function checkKanjiPlugin(input: PluginArguments): true | null;
}
