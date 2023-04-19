declare module "lib/answer_checker/plugins/checkRelatedMeaningsAndReadingsPlugin" {
  import { PluginArguments } from "lib/answer_checker/answer_checker";

  export default function checkRelatedMeaningsAndReadingsPlugin(
    input: PluginArguments
  ): string | null;
}
