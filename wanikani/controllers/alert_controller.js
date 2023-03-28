import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static classes = ["open"];
  close(e) {
    e.preventDefault(),
      this.element.addEventListener("transitionend", () =>
        this.element.remove()
      ),
      this.element.classList.remove(this.openClass);
  }
}
