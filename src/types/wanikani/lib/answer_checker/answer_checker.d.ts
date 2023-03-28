declare module "lib/answer_checker/answer_checker" {
  import { QuestionAnswerResults, Subject } from "events/did_answer_question";

  export interface AnswerException {
    exception: string;
  }

  export default class AnswerChecker {
    evaluate(
      questionType: "meaning" | "reading",
      answer: string,
      subject: Subject,
      synonyms: string[]
    ): QuestionAnswerResults | AnswerException;

    evaluatePlugins(
      questionType: "meaning" | "reading",
      answer: string,
      subject: Subject,
      answerResult: QuestionAnswerResults
    ): string | null;
  }
}
