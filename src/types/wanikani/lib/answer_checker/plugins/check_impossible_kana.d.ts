declare module "lib/answer_checker/plugins/check_impossible_kana" {
  import { PluginArguments } from "lib/answer_checker/answer_checker";
  export default function checkImpossibleKana(
    input: PluginArguments
  ): null | string;
}
