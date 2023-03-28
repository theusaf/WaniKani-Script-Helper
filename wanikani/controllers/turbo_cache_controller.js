import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  reset() {
    Turbo.cache.clear();
  }
}
