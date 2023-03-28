declare module "events/register_wrap_up_observer" {
  export interface WKObserver {
    onRegistration: (
      activate: () => void,
      deactivate: (observer: WKObserver) => void
    ) => void;
    onUpdateCount: ({ currentCount: number }) => void;
    onWrapUp: ({ isWrappingUp: number, currentCount: number }) => void;
  }

  export default class RegisterWrapUpObserver extends CustomEvent<WKObserver> {
    constructor(options: {
      observer: MutationObserver;
    }): RegisterWrapUpObserver;
    type: "registerWrapUpObserver";
    static newObserver(options: WKObserver): WKObserver;
  }
}
