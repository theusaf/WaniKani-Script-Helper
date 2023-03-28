import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["remainingCount", "input"];
  static values = { maxLength: Number };
  initialize() {
    this.updateCount();
  }
  updateCount() {
    this.hasRemainingCountTarget &&
      (this.remainingCountTarget.textContent =
        this.maxLengthValue - this.inputTarget.value.length);
  }
  truncateText() {
    (this.inputTarget.value = this.inputTarget.value.slice(
      0,
      this.maxLengthValue
    )),
      this.updateCount();
  }
}
