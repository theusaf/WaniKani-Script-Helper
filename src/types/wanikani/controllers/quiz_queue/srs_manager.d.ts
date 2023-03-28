declare module "controllers/quiz_queue/srs_manager" {
  import { SRSMap } from "controllers/quiz_queue/queue";
  import { SubjectWithStats } from "events/did_answer_question";

  export default class SRSManager {
    static textForLevel(
      level: number
    ): "Apprentice" | "Guru" | "Master" | "Enlighten" | "Burn" | number;

    constructor(param: SRSMap);

    /**
     * Updates SRS data and displays text.
     *
     * @param param
     */
    updateSRS(param: SubjectWithStats): void;
  }
}
