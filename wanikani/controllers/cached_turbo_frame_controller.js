import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["offline"];
  initialize() {
    (this.requiresReload = !0),
      (this.currentURL = null),
      (this.offlineNode = this.offlineTarget.cloneNode(!0));
    const e = (e) => (t) => {
      t.target === this.element && e(t);
    };
    (this.showOfflineNode = () => {
      this.element.replaceChildren(this.offlineNode);
    }),
      this.element.addEventListener(
        "turbo:fetch-request-error",
        e(this.showOfflineNode)
      ),
      this.element.addEventListener(
        "turbo:before-fetch-request",
        e((e) => {
          (this.currentURL = e.detail.url.href),
            this.hasOfflineTarget && this.offlineTarget.remove(),
            this.requiresReload || e.preventDefault();
        })
      ),
      this.element.addEventListener(
        "turbo:frame-load",
        e(() => {
          (this.element.dataset.loaded = !0),
            (this.requiresReload = this.element.src !== this.currentURL),
            this.dispatch("contentLoaded", { prefix: !1 });
        })
      );
  }
  expireCache() {
    (this.requiresReload = !0),
      (this.currentURL = null),
      (this.element.dataset.loaded = !1);
  }
}
