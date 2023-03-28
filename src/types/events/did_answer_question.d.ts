declare module "events/did_answer_question" {

  export interface DidAnswerQuestionEventDetails {
    subjectWithStats: any, // todo
    questionType: string,
    answer: string,
    results: any, // todo
  }

  export default class DidAnswerQuestionEvent extends CustomEvent<DidAnswerQuestionEventDetails> {
    constructor(details: DidAnswerQuestionEventDetails): ConnectionTimeout;
    type: "didAnswerQuestion";
  }

}
