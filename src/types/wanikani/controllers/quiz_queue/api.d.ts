declare module "controllers/quiz_queue/api" {
  export default class API {
    /**
     * The CSRF token for the current session.
     */
    static get CSRFToken(): string;

    /**
     * The headers to use for JSON requests.
     */
    static get jsonHeaders(): Record<string, string>;
  }
}
