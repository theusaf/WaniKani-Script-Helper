declare module "controllers/quiz_queue/srs_manager" {
  import { SRSMap } from "controllers/quiz_queue/queue";
  import { SubjectWithStats } from "events/did_answer_question";

  export default class SRSManager {
    static textForLevel(
      level: number
    ): "Apprentice" | "Guru" | "Master" | "Enlighten" | "Burn" | number;

    constructor(param: SRSMap);

    srsMap: SRSMap;

    /**
     * Updates SRS data and displays text.
     *
     * ---
     * * This method works by dispatching a `didChangeSRS` event.
     * * This gets picked up by the `QuizHeaderController` and updates
     *   the text on the page.
     * * This method does not interact with the API or the cache.
     * ---
     * * This method is called by `QuizQueue#submitAnswer`.
     *
     * @param param
     */
    updateSRS(param: SubjectWithStats): void;
  }
}
