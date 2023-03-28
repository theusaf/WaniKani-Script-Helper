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

  export interface AuxiliaryData {
    type: string;
    message: string;
  }
  export interface AuxiliaryReading extends AuxiliaryData {
    reading: string;
  }
  export interface AuxiliaryMeaning extends AuxiliaryData {
    meaning: string;
  }

  export interface Subject {
    id: number;
    readings?: Reading[];
    meanings: string[]; // verify this
    subject_category: string;
    characters?: string | Chactacters;
    type: "Kanji" | "Vocabulary";
    primary_reading_type?: string;
    onyomi?: string[];
    kunyomi?: string[];
    nanori?: string[];
    kanji?: string[];
    auxiliary_meanings?: AuxiliaryMeaning[];
    auxiliary_readings?: AuxiliaryReading[];
  }

  export interface SubjectWithStats {
    subject: Subject;
    stats: Stats;
  }

  export interface QuestionAnswerResults {
    /**
     * Whether the answer was correct.
     */
    passed: boolean;
    /**
     * Whether the answer was an exact match.
     */
    accurate: boolean;
    /**
     * Whether there were multiple possible answers.
     */
    multipleAnswers: boolean;
  }

  export interface DidAnswerQuestionEventDetails {
    subjectWithStats: SubjectWithStats;
    questionType: "reading" | "meaning";
    answer: string;
    results: QuestionAnswerResults;
  }

  export default class DidAnswerQuestionEvent extends CustomEvent<DidAnswerQuestionEventDetails> {
    constructor(details: DidAnswerQuestionEventDetails);
    type: "didAnswerQuestion";
  }
}
