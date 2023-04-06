import { Controller } from "@hotwired/stimulus";
import RegisterWrapUpObserverEvent from "events/register_wrap_up_observer";
export default class extends Controller {
  static classes = ["count", "active"];
  initialize() {
    (this.countTarget = this.element.getElementsByClassName(
      this.countClass
    )[0]),
      (this.onWrapUp = this.onWrapUp.bind(this)),
      (this.onRegistration = this.onRegistration.bind(this)),
      (this.onUpdateCount = this.onUpdateCount.bind(this));
  }
  disconnect() {
    this.deregisterObserver && this.deregisterObserver(this.observer);
  }
  onRegistration(t, e) {
    (this.deregisterObserver = e), (this.toggleWrapUp = t), this.toggleWrapUp();
  }
  onUpdateCount({ currentCount: t }) {
    this.countTarget.innerText = t;
  }
  onWrapUp({ isWrappingUp: t, currentCount: e }) {
    (this.countTarget.innerText = t ? e : ""),
      this.hasActiveClass && this.element.classList.toggle(this.activeClass, t);
  }
  toggle() {
    this.observer
      ? this.toggleWrapUp()
      : ((this.observer = RegisterWrapUpObserverEvent.newObserver({
          onRegistration: this.onRegistration,
          onUpdateCount: this.onUpdateCount,
          onWrapUp: this.onWrapUp,
        })),
        window.dispatchEvent(
          new RegisterWrapUpObserverEvent({ observer: this.observer })
        ));
  }
}
