import { Subject } from "events/did_answer_question";

declare module "events/will_show_next_question" {
  export interface WillShowNextQuestionEventDetails {
    questionType: "meaning" | "reading";
    subject: Subject;
  }
  export default class WillShowNextQuestionEvent extends CustomEvent<WillShowNextQuestionEventDetails> {
    constructor(
      details: WillShowNextQuestionEventDetails
    ): WillShowNextQuestionEvent;
    type: "willShowNextQuestion";
  }
}
