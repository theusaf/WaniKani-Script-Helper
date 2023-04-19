declare module "lib/answer_checker/plugins/checkWarningListPlugin" {
  import { PluginArguments } from "lib/answer_checker/answer_checker";

  /**
   * Checks if there is a specific warning for the answer.
   * If so, it will return the warning.
   * This is used for things like WaniKani changing which reading to use.
   */
  export default function checkWarningList(
    input: PluginArguments
  ): string | null;
}
