declare module "events/will_show_next_question" {
  import { Subject } from "events/did_answer_question";

  export interface WillShowNextQuestionEventDetails {
    questionType: "meaning" | "reading";
    subject: Subject;
  }
  export default class WillShowNextQuestionEvent extends CustomEvent<WillShowNextQuestionEventDetails> {
    constructor(details: WillShowNextQuestionEventDetails);
    type: "willShowNextQuestion";
  }
}
