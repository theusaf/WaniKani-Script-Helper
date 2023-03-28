import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  initialize() {
    let e;
    (this.autoGrow = () => {
      (this.element.style.height = "auto"),
        (this.element.style.height = `${this.element.scrollHeight}px`);
    }),
      (this.debounce = (t, i) => {
        clearTimeout(e), (e = setTimeout(t, i));
      });
  }
  connect() {
    (this.element.style.overflow = "hidden"),
      (this.onResize = this.debounce(this.autoGrow, 100)),
      this.autoGrow(),
      this.element.addEventListener("input", this.autoGrow),
      window.addEventListener("resize", this.onResize);
  }
  disconnect() {
    window.removeEventListener("resize", this.onResize);
  }
}
