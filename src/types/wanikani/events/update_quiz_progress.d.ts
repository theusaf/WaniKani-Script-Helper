declare module "events/update_quiz_progress" {
  export interface UpdateQuizProgressDetail {
    percentComplete: number;
  }
  export default class UpdateQuizProgress extends CustomEvent<UpdateQuizProgressDetail> {
    constructor(progress: number);
    type: "updateQuizProgress";
  }
}
