import { Controller } from "@hotwired/stimulus";
import RegisterWrapUpObserverEvent from "events/register_wrap_up_observer";
export default class extends Controller {
  static classes = ["count", "active"];
  initialize() {
    this.countTarget = this.element.getElementsByClassName(this.countClass)[0];
  }
  disconnect() {
    this.deregisterObserver && this.deregisterObserver(this.observer);
  }
  onRegistration = (e, t) => {
    (this.deregisterObserver = t), (this.toggleWrapUp = e), this.toggleWrapUp();
  };
  onUpdateCount = ({ currentCount: e }) => {
    this.countTarget.innerText = e;
  };
  onWrapUp = ({ isWrappingUp: e, currentCount: t }) => {
    (this.countTarget.innerText = e ? t : ""),
      this.hasActiveClass && this.element.classList.toggle(this.activeClass, e);
  };
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
