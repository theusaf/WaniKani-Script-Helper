import { QuestionEventDetailsStats } from "events/did_answer_question";

declare module "events/did_complete_subject" {
  export interface DidCompleteSubjectEventDetails {
    subjectWithStats: QuestionEventDetailsStats;
  }
  export default class DidCompleteSubjectEvent extends CustomEvent<DidCompleteSubjectEventDetails> {
    constructor(
      details: DidCompleteSubjectEventDetails
    ): DidCompleteSubjectEvent;
    type: "didCompleteSubject";
  }
}
