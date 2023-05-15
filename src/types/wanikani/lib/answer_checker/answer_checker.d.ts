declare module "lib/answer_checker/answer_checker" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";
  import { QuestionAnswerResults, Subject } from "events/did_answer_question";

  export interface AnswerException {
    exception: string;
  }

  export interface PluginArguments {
    questionType: "meaning" | "reading";
    response: string;
    item: Subject;
    userSynonyms: string[];
    inputChars: string;
  }

  export default class AnswerChecker {
    get plugins(): Plugin[];

    messageForItemInfo(input: {
      questionType: "meaning" | "reading";
      result: QuestionAnswerResults;
      userSynonyms: string[];
      response: string;
    }): string;

    evaluate(input: PluginArguments): QuestionAnswerResults | AnswerException;

    evaluatePlugins(input: PluginArguments): string | null;
  }
}
