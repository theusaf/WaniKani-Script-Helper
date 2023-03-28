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
    window.addEventListener("willShowNextQuestion", this.#onWillShowNextQuestion),
      window.addEventListener("didChangeSRS", this.#t);
  }
  disconnect() {
    window.removeEventListener("willShowNextQuestion", this.#onWillShowNextQuestion),
      window.removeEventListener("didChangeSRS", this.#t);
  }
  #onWillShowNextQuestion = (e) => {
    const { subject } = e.detail;
    if (
      (this.variantClass && this.element.classList.remove(this.variantClass),
      (this.variantClass = `${
        this.baseClass
      }--${subject.subject_category.toLowerCase()}`),
      this.element.classList.add(this.variantClass),
      "string" == typeof subject.characters)
    )
      this.charactersTarget.innerText = subject.characters;
    else {
      const e = this.characterImageTemplate.content.firstElementChild.cloneNode(
        !0
      );
      (e.src = subject.characters.url),
        e.setAttribute("alt", subject.characters.meaning),
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
