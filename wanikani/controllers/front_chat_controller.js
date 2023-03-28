import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  open(o) {
    "function" == typeof window.FrontChat &&
      (o.preventDefault(), window.FrontChat("show"));
  }
}
