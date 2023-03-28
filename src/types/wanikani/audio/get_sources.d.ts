import { QuestionAnswerResults, Subject } from "events/did_answer_question";

declare module "audio/get_sources" {
  export interface GetSourcesParams {
    subject: Subject;
    questionType: "meaning" | "reading";
    answer: string;
    results: QuestionAnswerResults;
    preferredVoiceActorId: number;
  }

  /**
   * Returns an array of HTMLSourceElement objects that can be used to play
   * the audio for the given parameters.
   *
   * @param params The parameters to use when getting the audio source.
   */
  export default function getSources(
    params: GetSourcesParams
  ): HTMLSourceElement[];
}
