declare module "events/did_complete_subject" {
  import { QuestionEventDetailsStats } from "events/did_answer_question";
  export interface DidCompleteSubjectEventDetails {
    subjectWithStats: QuestionEventDetailsStats;
  }
  export default class DidCompleteSubjectEvent extends CustomEvent<DidCompleteSubjectEventDetails> {
    constructor(details: DidCompleteSubjectEventDetails);
    type: "didCompleteSubject";
  }
}
