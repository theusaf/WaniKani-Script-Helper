declare module "lib/answer_checker/check_kanji_does_not_start_with_to" {
  import { PluginArguments } from "lib/answer_checker/answer_checker";
  export default function checkKanjiDoesNotStartWithTo(
    input: PluginArguments
  ): string | null;
}
