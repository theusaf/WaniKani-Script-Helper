declare module "lib/answer_checker/answer_checker" {
  import { QuestionAnswerResults, Subject } from "events/did_answer_question";

  export interface AnswerException {
    exception: string;
  }

  export interface PluginArguments {
    questionType: "meaning" | "reading";
    response: string;
    item: Subject;
    useSynonyms: string[];
    inputChars: string;
  }

  export default class AnswerChecker {
    evaluate(input: PluginArguments): QuestionAnswerResults | AnswerException;

    evaluatePlugins(input: PluginArguments): string | null;
  }
}
