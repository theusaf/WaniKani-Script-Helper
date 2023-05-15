import { Plugin } from "lib/answer_checker/plugins/plugin";
import {
  answerActionRetry,
  answerException,
} from "lib/answer_checker/utils/constants";
export class CheckWarningList extends Plugin {
  get shouldEvaluate() {
    return !0;
  }
  evaluate() {
    const e = this.warningList.find(
      (e) => e[this.questionType].toLowerCase() === this.response.toLowerCase()
    );
    return e
      ? {
          action: answerActionRetry,
          message: { type: answerException, text: e.message },
        }
      : null;
  }
  get warningList() {
    return (this.item[`auxiliary_${this.questionType}s`] || []).filter(
      (e) => "warn" === e.type
    );
  }
}
