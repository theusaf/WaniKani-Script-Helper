import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static outlets = ["body"];
  initialize() {
    this.adjustOffset = this.adjustOffset.bind(this);
  }
  connect() {
    window.visualViewport.addEventListener("resize", this.adjustOffset),
      window.visualViewport.addEventListener("scroll", this.adjustOffset);
  }
  disconnect() {
    this.bodyOutlet.unfreeze(),
      window.visualViewport.removeEventListener("resize", this.adjustOffset),
      window.visualViewport.removeEventListener("scroll", this.adjustOffset);
  }
  bodyOutletConnected(t) {
    t.freeze();
  }
  adjustOffset() {
    this.element.style.top = `${visualViewport.offsetTop}px`;
  }
  scrollIntoView(t) {
    const e = t.getBoundingClientRect().bottom + this.element.scrollTop,
      s =
        e <= visualViewport.height ? 0 : Math.floor(e - visualViewport.height);
    this.element.scrollTop = s;
  }
  scrollToTop(t, e) {
    const s = t.getBoundingClientRect().top + this.element.scrollTop - e;
    this.element.scrollTo({ top: s, left: 0, behavior: "smooth" });
  }
}
