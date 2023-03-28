import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static classes = ["frozen"];
  freeze() {
    this.element.classList.add(this.frozenClass);
  }
  unfreeze() {
    this.element.classList.remove(this.frozenClass);
  }
}
