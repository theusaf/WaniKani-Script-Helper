
declare module "controllers/quiz_queue/wrap_up_manager" {
  import RegisterWrapUpObserverEvent, { WKObserver } from "events/register_wrap_up_observer";
export default class WrapUpManager {
    constructor(count: number);

    queueSize: number;
    wrappingUp: boolean;
    wrapUpObservers: WKObserver[];

    /**
     * Updates the queue size for its observers.
     *
     * @param count
     */
    updateQueueSize(count: number): void;

    registerWrapUpObserver(observer: RegisterWrapUpObserverEvent): void;
    deregisterWrapUpObserver(observer: RegisterWrapUpObserverEvent): void;
    toggleWrapUp(): void;
  }
}
