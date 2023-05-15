declare module "lib/answer_checker/plugins/plugin" {
  import { Subject } from "events/did_answer_question";
  import { PluginArguments } from "lib/answer_checker/answer_checker";

  export interface Evaluation {
    action: string;
    message: {
      type: string;
      text: string;
    };
  }

  export class Plugin {
    questionType: "meaning" | "reading";
    response: string;
    item: Subject;
    userSysnonyms: string[];
    inputChars: string;

    constructor(input: PluginArguments);

    get shouldEvaluate(): boolean;

    evaluate(): Evaluation | null; // TODO: change this

    get readings(): string[];
  }
}
