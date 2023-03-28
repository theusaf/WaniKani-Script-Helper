declare module "events/did_answer_question" {
  import { Stats } from "controllers/quiz_queue/cached_stats";
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

  export interface SubjectWithStats {
    subject: Subject;
    stats: Stats;
  }

  export interface QuestionAnswerResults {
    passed: boolean;
    accurate: boolean;
    multipleAnswers: boolean;
  }

  export interface DidAnswerQuestionEventDetails {
    subjectWithStats: SubjectWithStats; // todo
    questionType: "reading" | "meaning";
    answer: string;
    results: QuestionAnswerResults;
  }

  export default class DidAnswerQuestionEvent extends CustomEvent<DidAnswerQuestionEventDetails> {
    constructor(details: DidAnswerQuestionEventDetails);
    type: "didAnswerQuestion";
  }
}
