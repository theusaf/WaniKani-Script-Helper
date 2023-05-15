import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static classes = ["frozen"];
  freeze() {
    (document.body.style.overflow = "hidden"),
      this.element.classList.add(this.frozenClass);
  }
  unfreeze() {
    (document.body.style.overflow = ""),
      this.element.classList.remove(this.frozenClass);
  }
}
