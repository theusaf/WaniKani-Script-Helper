export default class WrapUpManager {
  #observers = [];
  #currentCount = 0;
  #isWrappingUp = !1;
  constructor(r) {
    (this.#currentCount = r),
      window.addEventListener("registerWrapUpObserver", this.#onRegisterWrapUp);
  }
  get wrappingUp() {
    return this.#isWrappingUp;
  }
  updateQueueSize(r) {
    (this.#currentCount = r),
      this.#observers.forEach((e) => e.onUpdateCount({ currentCount: r }));
  }
  #onRegisterWrapUp = (r) => {
    const { observer: observer } = r.detail;
    this.#observers.push(observer),
      observer.onRegistration(this.#wrapUp, this.#removeObserver);
  };
  #removeObserver = (r) => {
    const e = this.#observers.findIndex((e) => e === r);
    -1 !== e && this.#observers.splice(e, 1);
  };
  #wrapUp = () => {
    (this.#isWrappingUp = !this.#isWrappingUp),
      this.#observers.forEach((obs) =>
        obs.onWrapUp({
          isWrappingUp: this.#isWrappingUp,
          currentCount: this.#currentCount,
        })
      );
  };
}
