export default class WrapUpManager {
  #r = [];
  #e = 0;
  #p = !1;
  constructor(r) {
    (this.#e = r), window.addEventListener("registerWrapUpObserver", this.#s);
  }
  get wrappingUp() {
    return this.#p;
  }
  updateQueueSize(r) {
    (this.#e = r), this.#r.forEach((e) => e.onUpdateCount({ currentCount: r }));
  }
  #s = (r) => {
    const { observer: e } = r.detail;
    this.#r.push(e), e.onRegistration(this.#t, this.#i);
  };
  #i = (r) => {
    const e = this.#r.findIndex((e) => e === r);
    -1 !== e && this.#r.splice(e, 1);
  };
  #t = () => {
    (this.#p = !this.#p),
      this.#r.forEach((r) =>
        r.onWrapUp({ isWrappingUp: this.#p, currentCount: this.#e })
      );
  };
}
