const whitelist = ["/(readers|level|radicals|kanji|vocabulary|subjects).*"];
document.documentElement.addEventListener("turbo:before-visit", (e) => {
  whitelist.find((t) =>
    new RegExp(`^${window.location.origin + t}$`).test(e.detail.url)
  ) || (e.preventDefault(), (window.location.href = e.detail.url));
});
