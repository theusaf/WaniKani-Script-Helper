import ConnectionTimeout from "events/connection_timeout";
import CachedQueue from "controllers/quiz_queue/cached_queue";
import API from "controllers/quiz_queue/api";
export default class QuizAPI {
  #e;
  #t = 0;
  #s = !1;
  #i;
  #r;
  constructor({ completionUrl: e, itemsUrl: t }) {
    (this.#i = e),
      (this.#r = t),
      (this.#e = new CachedQueue(`pending-items/${e}`));
  }
  submitFailed = async () => {
    await this.#n();
  };
  itemComplete = ({ item: e, stats: t }) => {
    const s = { meaning: t.meaning.incorrect, reading: t.reading.incorrect };
    this.#e.set(e.id, s), this.#n();
  };
  fetchItems = async ({ ids: e }) => {
    const t = `${this.#r}?ids=${e.join("-")}`;
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
  };
  #u = () => {
    (this.#t += 1),
      this.#t < 5
        ? setTimeout(() => {
            this.#n();
          }, 100 * this.#t)
        : this.#o()
        ? (this.#h(), this.#e.reset())
        : (this.#a(), window.dispatchEvent(new ConnectionTimeout()));
  };
  #n = async () => {
    if (this.#s || 0 === this.#e.size) return;
    this.#s = !0;
    const e = this.#e.hashes,
      t = JSON.stringify({ counts: e }),
      s = await fetch(this.#i, {
        method: "PUT",
        headers: API.jsonHeaders,
        body: t,
      }).catch(() => ({ ok: !1 }));
    (this.#s = !1),
      s.ok
        ? (e.forEach((e) => this.#e.delete(e.id)),
          (this.#t = 0),
          this.#h(),
          this.#e.size > 0 && this.#n())
        : this.#u();
  };
  #a = () => {
    sessionStorage.setItem("quiz-api/retries", "exhausted");
  };
  #o = () => null !== sessionStorage.getItem("quiz-api/retries");
  #h = () => {
    sessionStorage.removeItem("quiz-api/retries");
  };
}
