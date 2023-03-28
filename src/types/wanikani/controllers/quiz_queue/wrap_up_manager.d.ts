declare module "controllers/quiz_queue/wrap_up_manager" {
  export default class WrapUpManager {
    constructor(count: number);

    get wrappingUp(): boolean;

    /**
     * Updates the queue size for its observers.
     *
     * @param count
     */
    updateQueueSize(count: number): void;
  }
}
