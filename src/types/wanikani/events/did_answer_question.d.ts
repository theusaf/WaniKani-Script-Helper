declare module "events/did_answer_question" {
  export interface PronounciationSource {
    url: string;
    content_type: string;
  }

  export interface Pronounciation {
    actor: {
      id: number;
    };
    sources: PronounciationSource[];
  }

  export interface Reading {
    reading: string;
    pronounciations: Pronounciation[];
  }

  export interface Chactacters {
    url: string;
    meaning: string;
  }

  export interface Subject {
    id: number;
    readings: Reading[];
    subject_category: string;
    characters: string | Chactacters;
  }

  export interface QuestionEventDetailsStats {
    subject: Subject;
    stats: {
      meaning: {
        incorrect: number;
      };
      reading: {
        incorrect: number;
      };
    };
  }

  export interface QuestionEventDetailsResults {
    passed: boolean;
    accurate: boolean;
    multipleAnswers: boolean;
  }

  export interface DidAnswerQuestionEventDetails {
    subjectWithStats: QuestionEventDetailsStats; // todo
    questionType: "reading" | "meaning";
    answer: string;
    results: QuestionEventDetailsResults;
  }

  export default class DidAnswerQuestionEvent extends CustomEvent<DidAnswerQuestionEventDetails> {
    constructor(details: DidAnswerQuestionEventDetails);
    type: "didAnswerQuestion";
  }
}
