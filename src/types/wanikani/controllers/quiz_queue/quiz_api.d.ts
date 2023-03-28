declare module "controllers/quiz_queue/quiz_api" {
  import { Subject } from "events/did_answer_question";
  import { Stats } from "controllers/quiz_queue/cached_stats";

  export interface QuizAPIContructorParams {
    completionUrl: string;
    itemsUrl: string;
  }

  export default class QuizAPI {
    constructor(params: QuizAPIContructorParams);

    /**
     * Submits a question result.
     */
    submitFailed(): Promise<void>;

    /**
     * Submits a question result.
     *
     * @param params
     */
    itemComplete(params: { item: Subject; stats: Stats }): Promise<void>;

    /**
     * Fetches subjects and items from the api.
     *
     * @param params
     */
    fetchItems(params: { ids: number[] }): Promise<Subject[]>;
  }
}
