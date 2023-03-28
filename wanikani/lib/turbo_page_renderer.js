import { Turbo } from "@hotwired/turbo-rails";
Object.assign(Turbo.PageRenderer.prototype, {
  assignNewBody() {
    const e = document.querySelector("#turbo-body"),
      t = this.newElement.querySelector("#turbo-body");
    setTimeout(() => {
      e && t ? e.replaceWith(t) : document.body.replaceWith(this.newElement);
    }, 0);
  },
});
