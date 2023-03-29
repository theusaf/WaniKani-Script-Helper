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
     *
     * ---
     * * This method may emit a `connectionTimeout` event if the request
     *   takes too long.
     *   * This event is picked up by the `TimeoutController`.
     * * This method will save progress to the API.
     * ---
     * * It is called from `QuizQueueController#initialize`.
     */
    submitFailed(): Promise<void>;

    /**
     * Submits a question result.
     *
     * ---
     * * Emits a `connectionTimeout` event if the request takes too long.
     * * This method will save progress to the API.
     * ---
     * * Called by `QuizQueue#submitAnswer`.
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
