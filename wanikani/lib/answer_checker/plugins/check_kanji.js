import { Plugin } from "lib/answer_checker/plugins/plugin";
import { answerActionRetry } from "lib/answer_checker/utils/constants";
export class CheckKanji extends Plugin {
  get shouldEvaluate() {
    return this.item.characters === this.response;
  }
  evaluate() {
    return { action: answerActionRetry, message: null };
  }
}
