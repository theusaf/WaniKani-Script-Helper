export default class RegisterWrapUpObserverEvent extends CustomEvent {
  constructor({ observer: e }) {
    super("registerWrapUpObserver", { detail: { observer: e } });
  }
  static newObserver({ onRegistration: e, onUpdateCount: r, onWrapUp: t }) {
    return { onRegistration: e, onUpdateCount: r, onWrapUp: t };
  }
}
