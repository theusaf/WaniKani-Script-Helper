declare module "controllers/quiz_queue/cached_stats" {
  export interface StatData {
    incorrect: number;
    complete: boolean;
  }
  export interface Stats {
    meaning: StatData;
    reading: StatData;
  }
  export interface CachedStatsParam {
    id: number;
  }
  /**
   * A map that stores statistics in memory.
   */
  export default class CachedStats {
    /**
     * Deletes a value from the map.
     *
     * @param key The key to delete. Usually a Subject.
     */
    delete(key: CachedStatsParam): boolean;

    /**
     * Gets a value from the map.
     *
     * @param key The key to get. Usually a Subject.
     */
    get(key: CachedStatsParam): Stats;

    /**
     * Sets a value in the map.
     *
     * @param key The key to set. Usually a Subject.
     * @param value The stats to set.
     */
    set(key: CachedStatsParam, value: Stats): Map<number, Stats>;

    /**
     * Returns the items in the map as an array.
     */
    toJSON(): [number, Stats][];
  }
}
