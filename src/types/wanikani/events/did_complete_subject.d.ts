declare module "events/did_complete_subject" {
  import { SubjectWithStats } from "events/did_answer_question";
  export interface DidCompleteSubjectEventDetails {
    subjectWithStats: SubjectWithStats;
  }
  export default class DidCompleteSubjectEvent extends CustomEvent<DidCompleteSubjectEventDetails> {
    constructor(details: DidCompleteSubjectEventDetails);
    type: "didCompleteSubject";
  }
}
