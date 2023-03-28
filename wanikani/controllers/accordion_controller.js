import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["container"];
  toggle() {
    const t = "true" == this.containerTarget.getAttribute("aria-expanded");
    this.containerTarget.setAttribute("aria-expanded", t ? "false" : "true");
  }
}
