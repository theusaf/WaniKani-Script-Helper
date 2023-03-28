declare module "controllers/wrap_up_controller" {
  import { WKObserver } from "events/register_wrap_up_observer";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static classes: string[];
    get countClass(): string;
    get countClasses(): string[];
    get hasCountClass(): boolean;
    get activeClass(): string;
    get activeClasses(): string[];
    get hasActiveClass(): boolean;
    observer: WKObserver;
    initialize(): void;
    disconnect(): void;
    toggle(): void;
    onRegistration(
      toggleWrapUp: () => void,
      deregisterObserver: (observer: WKObserver) => void
    ): void;
    onUpdateCount(count: { currentCount: number }): void;
    onWrapUp(param: { currentCount: number; isWrappingUp: boolean }): void;
  }
}
