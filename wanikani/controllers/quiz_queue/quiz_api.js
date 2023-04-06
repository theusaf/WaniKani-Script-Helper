import ConnectionTimeout from "events/connection_timeout";
import CachedQueue from "controllers/quiz_queue/cached_queue";
import API from "controllers/quiz_queue/api";
export default class QuizAPI {
  constructor({ completionUrl: e, itemsUrl: t }) {
    (this.completionUrl = e),
      (this.itemsUrl = t),
      (this.queue = new CachedQueue(`pending-items/${e}`)),
      (this.retryCount = 0),
      (this.syncing = !1);
  }
  async submitFailed() {
    await this.sendQueue();
  }
  itemComplete({ item: e, stats: t }) {
    const s = { meaning: t.meaning.incorrect, reading: t.reading.incorrect };
    this.queue.set(e.id, s), this.sendQueue();
  }
  async fetchItems({ ids: e }) {
    const t = `${this.itemsUrl}?ids=${e.join("-")}`;
    return new Promise((e, s) => {
      const i = (r) => {
        r >= 5
          ? s(new Error("failed to fetch items"))
          : fetch(t)
              .then((t) => {
                t.ok
                  ? t
                      .json()
                      .then((t) => e(t))
                      .catch((e) => s(e))
                  : setTimeout(() => {
                      i(r + 1);
                    }, 100 * (r + 1));
              })
              .catch(() => {
                setTimeout(() => {
                  i(r + 1);
                }, 100 * (r + 1));
              });
      };
      i(0);
    });
  }
  retrySend() {
    (this.retryCount += 1),
      this.retryCount < 5
        ? setTimeout(() => {
            this.sendQueue();
          }, 100 * this.retryCount)
        : this.hadExhaustedRetries()
        ? (this.clearExhaustedRetriesFlag(), this.queue.reset())
        : (this.setRetriesExhausted(),
          window.dispatchEvent(new ConnectionTimeout()));
  }
  async sendQueue() {
    if (this.syncing || 0 === this.queue.size) return;
    this.syncing = !0;
    const e = this.queue.hashes,
      t = JSON.stringify({ counts: e }),
      s = await fetch(this.completionUrl, {
        method: "PUT",
        headers: API.jsonHeaders,
        body: t,
      }).catch(() => ({ ok: !1 }));
    (this.syncing = !1),
      s.ok
        ? (e.forEach((e) => this.queue.delete(e.id)),
          (this.retryCount = 0),
          this.clearExhaustedRetriesFlag(),
          this.queue.size > 0 && this.sendQueue())
        : this.retrySend();
  }
  setRetriesExhausted() {
    sessionStorage.setItem("quiz-api/retries", "exhausted");
  }
  hadExhaustedRetries() {
    return null !== sessionStorage.getItem("quiz-api/retries");
  }
  clearExhaustedRetriesFlag() {
    sessionStorage.removeItem("quiz-api/retries");
  }
}
