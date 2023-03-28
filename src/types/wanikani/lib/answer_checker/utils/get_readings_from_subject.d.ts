declare module "lib/answer_checker/utils/get_readings_from_subject" {
  import { Subject } from "events/did_answer_question";

  export function getReadingsFromSubject(subject: Subject): string[];
}
