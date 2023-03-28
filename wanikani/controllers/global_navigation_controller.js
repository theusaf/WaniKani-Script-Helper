import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["toggle", "navigationContent"];
  static classes = ["open"];
  initialize() {
    (this.isOpen = !1),
      (this.onResize = () => {
        (this.isDesktopView = document.body.clientWidth >= 1024),
          this.isDesktopView && this.close();
      }),
      (this.onDocumentClick = (t) => {
        t.target == this.toggleTarget ||
          this.toggleTarget.contains(t.target) ||
          this.navigationContentTarget.contains(t.target) ||
          this.close();
      });
  }
  connect() {
    window.addEventListener("resize", this.onResize),
      document.addEventListener("click", this.onDocumentClick);
  }
  disconnect() {
    window.removeEventListener("resize", this.onResize),
      document.removeEventListener("click", this.onDocumentClick);
  }
  toggle(t) {
    t.preventDefault(), this.isOpen ? this.close() : this.open();
  }
  open() {
    (this.isOpen = !0),
      this.dispatch("open"),
      this.element.classList.add(this.openClass),
      this.toggleTargets.forEach((t) => t.setAttribute("aria-expanded", !0));
  }
  close() {
    (this.isOpen = !1),
      this.dispatch("close"),
      this.element.classList.remove(this.openClass),
      this.toggleTargets.forEach((t) => t.setAttribute("aria-expanded", !1));
  }
}
