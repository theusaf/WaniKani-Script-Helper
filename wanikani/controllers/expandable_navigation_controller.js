import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["toggle", "expandableChunk", "expandableChunkContent"];
  static classes = ["open"];
  initialize() {
    (this.isOpen = !1),
      (this.adjustHeight = () =>
        this.expandableChunkTarget.style.setProperty(
          "--chunk-height",
          this.expandableChunkContentTarget.scrollHeight + "px"
        )),
      (this.onResize = () => {
        (this.isDesktopView = document.body.clientWidth >= 1024),
          this.isDesktopView && this.close(),
          this.adjustHeight();
      }),
      (this.onDocumentClick = (e) => {
        this.element.contains(e.target) || this.close();
      }),
      this.adjustHeight();
  }
  connect() {
    window.addEventListener("resize", this.onResize),
      document.addEventListener("click", this.onDocumentClick);
  }
  disconnect() {
    window.removeEventListener("resize", this.onResize),
      document.removeEventListener("click", this.onDocumentClick);
  }
  toggle(e) {
    e.preventDefault(), this.isOpen ? this.close() : this.open();
  }
  open() {
    (this.isOpen = !0),
      this.element.classList.add(this.openClass),
      this.toggleTarget.setAttribute("aria-expanded", !0);
  }
  close() {
    (this.isOpen = !1),
      this.element.classList.remove(this.openClass),
      this.toggleTarget.setAttribute("aria-expanded", !0);
  }
}
