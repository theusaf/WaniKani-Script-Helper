import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = [
    "characters",
    "meaning",
    "characterImage",
    "srsContainer",
    "srsIconUp",
    "srsIconDown",
    "srsText",
  ];
  static classes = ["base"];
  initialize() {
    this.characterImageTemplate = this.characterImageTarget;
  }
  connect() {
    window.addEventListener("willShowNextQuestion", this.#e),
      window.addEventListener("didChangeSRS", this.#t);
  }
  disconnect() {
    window.removeEventListener("willShowNextQuestion", this.#e),
      window.removeEventListener("didChangeSRS", this.#t);
  }
  #e = (e) => {
    const { subject: t } = e.detail;
    if (
      (this.variantClass && this.element.classList.remove(this.variantClass),
      (this.variantClass = `${
        this.baseClass
      }--${t.subject_category.toLowerCase()}`),
      this.element.classList.add(this.variantClass),
      "string" == typeof t.characters)
    )
      this.charactersTarget.innerText = t.characters;
    else {
      const e = this.characterImageTemplate.content.firstElementChild.cloneNode(
        !0
      );
      (e.src = t.characters.url),
        e.setAttribute("alt", t.characters.meaning),
        this.charactersTarget.replaceChildren(e);
    }
    this.srsContainerTarget.hidden = !0;
  };
  #t = (e) => {
    const { wentUp: t, newLevelText: s } = e.detail;
    (this.srsIconUpTarget.hidden = !t),
      (this.srsIconDownTarget.hidden = t),
      (this.srsTextTarget.innerText = s),
      (this.srsContainerTarget.hidden = !1),
      (this.srsContainerTarget.dataset.wentUp = t);
  };
}
