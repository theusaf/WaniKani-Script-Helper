declare module "lib/answer_checker/plugins/check_related_meanings_and_readings" {
  import { Plugin } from "lib/answer_checker/plugins/plugin";
  export class CheckRelatedMeaningsAndReadings extends Plugin {
    hasPopulatedArray(type: "meaning" | "reading"): boolean;
  }
}
