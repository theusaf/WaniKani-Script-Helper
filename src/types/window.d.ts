import { KeyboardManager } from "lib/keyboard_manager";

declare global {
  interface Window {
    keyboardManager: KeyboardManager;
  }
}
