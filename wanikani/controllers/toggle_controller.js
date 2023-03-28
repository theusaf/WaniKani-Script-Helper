import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["content", "toggle"];
  static classes = ["toggle", "content"];
  static values = {
    appliesClassOnExpand: { type: Boolean, default: !0 },
    context: Object,
  };
  initialize() {
    const t = this.contentTarget.classList.contains(this.contentClass);
    this.expanded =
      (this.appliesClassOnExpandValue && t) ||
      (!this.appliesClassOnExpandValue && !t);
  }
  connect() {
    this.toggleTarget.dataset.controllerConnected = !0;
  }
  toggle(t) {
    t.preventDefault(), this.expanded ? this.collapse() : this.expand();
  }
  expand() {
    this.contentTarget.classList.toggle(
      this.contentClass,
      this.appliesClassOnExpandValue
    ),
      this.toggleTargets.forEach((t) => {
        this.hasToggleClass &&
          t.classList.toggle(this.toggleClass, this.appliesClassOnExpandValue),
          t.setAttribute("aria-expanded", !0);
      }),
      (this.expanded = !0);
  }
  collapse() {
    this.contentTarget.classList.toggle(
      this.contentClass,
      !this.appliesClassOnExpandValue
    ),
      this.toggleTargets.forEach((t) => {
        this.hasToggleClass &&
          t.classList.toggle(this.toggleClass, !this.appliesClassOnExpandValue),
          t.setAttribute("aria-expanded", !1);
      }),
      (this.expanded = !1);
  }
}
