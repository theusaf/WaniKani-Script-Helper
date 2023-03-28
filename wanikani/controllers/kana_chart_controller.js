import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["tab", "tabContent"];
  static classes = ["activeTab"];
  static outlets = ["quiz-input"];
  connect() {
    (this.currentTab = this.tabTargets.find((t) =>
      t.classList.contains(this.activeTabClass)
    )),
      (this.activeContent = this.tabContentTargets.find((t) => !t.hidden));
  }
  showTabContent(t) {
    this.currentTab.classList.remove(this.activeTabClass),
      this.currentTab.setAttribute("aria-selected", "false"),
      (this.activeContent.hidden = !0),
      (this.currentTab = t.currentTarget),
      (this.activeContent = this.tabContentTargets.find(
        (t) => t.id === this.currentTab.getAttribute("aria-controls")
      )),
      this.currentTab.classList.add(this.activeTabClass),
      this.currentTab.setAttribute("aria-selected", "true"),
      (this.activeContent.hidden = !1);
  }
  sendCharacter(t) {
    this.hasQuizInputOutlet &&
      this.quizInputOutlet.appendKanaCharacter(
        t.currentTarget.dataset.character
      );
  }
  deleteCharacter() {
    this.hasQuizInputOutlet && this.quizInputOutlet.deleteCharacter();
  }
}
