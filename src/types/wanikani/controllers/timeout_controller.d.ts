declare module "controllers/timeout_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    connect(): void;
    disconnect(): void;
    showConnectionTimeout(): void;
  }
}
