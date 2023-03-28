declare module "controllers/quiz_queue/cached_queue" {
  /**
   * A map that stores data in session storage.
   * Used for storing quiz queue data.
   */
  export default class CachedQueue {
    /**
     * Creates a new CachedQueue with the given key.
     *
     * @param key The key to use for the cache in session storage.
     */
    constructor(key: string);

    /**
     * Sets a value in the queue.
     *
     * @param key
     * @param value
     */
    set(key: string, value: any): Map<string, any>;

    /**
     * Deletes a value from the queue.
     */
    delete(key: string): boolean;

    /**
     * The number of items in the queue.
     */
    get size(): number;

    /**
     * Returns the items in the queue as an array.
     */
    toJSON(): ReturnType<() => CachedQueue["items"]>;
    /**
     * Returns the items in the queue as an array.
     */
    get items(): [string, any][];

    get hashes(): {
      [x: string | number]: any;
      id: string;
    }[];

    /**
     * Clears the queue.
     */
    reset(): void;

    /**
     * Executes a callback and caches the items in the queue.
     *
     * @param callback
     */
    executeAndCache(callback: () => any): any;
  }
}
