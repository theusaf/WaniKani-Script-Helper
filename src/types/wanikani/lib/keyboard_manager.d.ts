declare module "lib/keyboard_manager" {

  export interface HotKeyOptions {
    key: string
    callback: (event: KeyboardEvent) => void
  }

  /**
   * The modal mode determines what callbacks to use
   * which can be useful for different kinds of callbacks
   */
  export class KeyboardManager {

    constructor(): KeyboardManager

    /**
     * Sets the modal mode to true.
     */
    setModalMode(): void

    /**
     * Sets the modal mode to false.
     */
    clearModalMode(): void

    /**
     * Registers a callback for a hotkey.
     *
     * @param options The options for the listener
     */
    registerHotKey(options: HotKeyOptions): void

    /**
     * Unregisters the callback for a hotkey.
     *
     * @param options The options for the listener
     */
    deregisterHotKey(options: HotKeyOptions): void

    /**
     * Handles a hotkey event and executes all related callbacks.
     *
     * @param event The event to handle
     * @param key The key pressed
     */
    handleHotKey(event: KeyboardEvent, key: string): void

  }

}
