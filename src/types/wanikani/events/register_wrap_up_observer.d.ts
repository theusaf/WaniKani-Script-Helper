declare module "events/register_wrap_up_observer" {
  export interface WKObserver {
    onRegistration: (
      activate: () => void,
      deactivate: (observer: WKObserver) => void
    ) => void;
    onUpdateCount: (data: { currentCount: number }) => void;
    onWrapUp: (options: { isWrappingUp: number; currentCount: number }) => void;
  }

  export default class RegisterWrapUpObserverEvent extends CustomEvent<WKObserver> {
    constructor(options: { observer: MutationObserver });
    type: "registerWrapUpObserver";
    static newObserver(options: WKObserver): WKObserver;
  }
}
