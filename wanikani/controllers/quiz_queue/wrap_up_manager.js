export default class WrapUpManager {
  constructor(r) {
    (this.wrapUpObservers = []),
      (this.queueSize = 0),
      (this.wrappingUp = !1),
      (this.queueSize = r),
      (this.registerWrapUpObserver = this.registerWrapUpObserver.bind(this)),
      (this.deregisterWrapUpObserver =
        this.deregisterWrapUpObserver.bind(this)),
      (this.toggleWrapUp = this.toggleWrapUp.bind(this)),
      window.addEventListener(
        "registerWrapUpObserver",
        this.registerWrapUpObserver
      );
  }
  updateQueueSize(r) {
    (this.queueSize = r),
      this.wrapUpObservers.forEach((e) => e.onUpdateCount({ currentCount: r }));
  }
  registerWrapUpObserver(r) {
    const { observer: e } = r.detail;
    this.wrapUpObservers.push(e),
      e.onRegistration(this.toggleWrapUp, this.deregisterWrapUpObserver);
  }
  deregisterWrapUpObserver(r) {
    const e = this.wrapUpObservers.findIndex((e) => e === r);
    -1 !== e && this.wrapUpObservers.splice(e, 1);
  }
  toggleWrapUp() {
    (this.wrappingUp = !this.wrappingUp),
      this.wrapUpObservers.forEach((r) =>
        r.onWrapUp({
          isWrappingUp: this.wrappingUp,
          currentCount: this.queueSize,
        })
      );
  }
}
