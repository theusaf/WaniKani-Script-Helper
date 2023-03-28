export default class API {
  static get CSRFToken() {
    let t = "";
    const e = document.querySelector("meta[name=csrf-token]");
    return e && (t = e.getAttribute("content")), t;
  }
  static get jsonHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": this.CSRFToken,
    };
  }
}
