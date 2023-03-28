import ConnectionTimeout from "events/connection_timeout";
import CachedQueue from "controllers/quiz_queue/cached_queue";
import API from "controllers/quiz_queue/api";
export default class QuizAPI {
  #itemCache;
  #retryCount = 0;
  #loading = !1;
  #completionUrl;
  #itemsUrl;
  constructor({ completionUrl: completionUrl, itemsUrl: itemsUrl }) {
    (this.#completionUrl = completionUrl),
      (this.#itemsUrl = itemsUrl),
      (this.#itemCache = new CachedQueue(`pending-items/${completionUrl}`));
  }
  submitFailed = async () => {
    await this.#submit();
  };
  itemComplete = ({ item, stats }) => {
    const value = {
      meaning: stats.meaning.incorrect,
      reading: stats.reading.incorrect,
    };
    this.#itemCache.set(item.id, value), this.#submit();
  };
  fetchItems = async ({ ids }) => {
    const url = `${this.#itemsUrl}?ids=${ids.join("-")}`;
    return new Promise((resolve, reject) => {
      const execute = (count) => {
        count >= 5
          ? reject(new Error("failed to fetch items"))
          : fetch(url)
              .then((response) => {
                response.ok
                  ? response
                      .json()
                      .then((data) => resolve(data))
                      .catch((e) => reject(e))
                  : setTimeout(() => {
                      execute(count + 1);
                    }, 100 * (count + 1));
              })
              .catch(() => {
                setTimeout(() => {
                  execute(count + 1);
                }, 100 * (count + 1));
              });
      };
      execute(0);
    });
  };
  #startRetries = () => {
    (this.#retryCount += 1),
      this.#retryCount < 5
        ? setTimeout(() => {
            this.#submit();
          }, 100 * this.#retryCount)
        : this.#checkRetriesCache()
        ? (this.#removeRetriesCache(), this.#itemCache.reset())
        : (this.#setRetiresExhausted(),
          window.dispatchEvent(new ConnectionTimeout()));
  };
  #submit = async () => {
    if (this.#loading || 0 === this.#itemCache.size) return;
    this.#loading = !0;
    const hashes = this.#itemCache.hashes,
      body = JSON.stringify({ counts: hashes }),
      response = await fetch(this.#completionUrl, {
        method: "PUT",
        headers: API.jsonHeaders,
        body: body,
      }).catch(() => ({ ok: !1 }));
    (this.#loading = !1),
      response.ok
        ? (hashes.forEach((e) => this.#itemCache.delete(e.id)),
          (this.#retryCount = 0),
          this.#removeRetriesCache(),
          this.#itemCache.size > 0 && this.#submit())
        : this.#startRetries();
  };
  #setRetiresExhausted = () => {
    sessionStorage.setItem("quiz-api/retries", "exhausted");
  };
  #checkRetriesCache = () =>
    null !== sessionStorage.getItem("quiz-api/retries");
  #removeRetriesCache = () => {
    sessionStorage.removeItem("quiz-api/retries");
  };
}
