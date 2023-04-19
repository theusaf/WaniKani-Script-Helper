declare module "lib/answer_checker/plugins/checkLongDashPlugin" {
  import { PluginArguments } from "lib/answer_checker/answer_checker";
  /**
   * Checks for dashes in the answer.
   * If the subject uses dashes, and the answer is only missin the dashes
   * then it will return a warning.
   */
  export default function checkLongDash(input: PluginArguments): string | null;
}
