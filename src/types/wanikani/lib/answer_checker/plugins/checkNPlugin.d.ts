declare module "lib/answer_checker/plguins/checkNPlugin" {
  import { PluginArguments } from "lib/answer_checker/answer_checker";

  /**
   * Checks for ambiguous 'n' in the answer.
   * If there is an ambiguous 'n' in the answer, it will return a warning.
   */
  export default function checkNPlugin(input: PluginArguments): string | null;
}
