declare module "events/did_answer_question" {
  import { Stats } from "controllers/quiz_queue/cached_stats";
  export interface PronounciationSource {
    url: string;
    content_type: string;
  }

  export interface PronounciationActor {
    id: number;
    description: string;
    gender: "male" | "female";
    name: string;
  }

  export interface Pronounciation {
    actor: PronounciationActor;
    sources: PronounciationSource[];
  }

  export interface Reading {
    reading: string;
    pronounciations: Pronounciation[];
  }

  export interface Character {
    url: string;
    meaning: string;
  }

  export interface AuxiliaryData {
    type: string;
    message?: string;
  }
  export interface AuxiliaryReading extends AuxiliaryData {
    reading: string;
  }
  export interface AuxiliaryMeaning extends AuxiliaryData {
    meaning: string;
  }

  export interface BaseSubject {
    auxiliary_meanings: AuxiliaryMeaning[];
    auxiliary_readings: AuxiliaryReading[];
    meanings: string[];
    id: number;
    characters: string | Character;
  }

  export interface KanjiSubject extends BaseSubject {
    kunyomi: string[];
    onyomi: string[];
    nanori: string[];
    primary_reading_type: "onyomi" | "kunyomi" | "nanori";
    type: "Kanji";
    subject_category: "Kanji";
    characters: string;
  }

  export interface Kanji {
    id: number;
    readings: string[];
    meanings: string[];
  }

  export interface VocabularySubject extends BaseSubject {
    readings: Reading[];
    kanji: Kanji[];
    type: "Vocabulary";
    subject_category: "Vocabulary";
    characters: string;
  }

  export interface RadicalSubject extends BaseSubject {
    auxiliary_readings: undefined;
    characters: Character | string;
    type: "Radical";
    subject_category: "Radical";
  }

  export type Subject = KanjiSubject | VocabularySubject | RadicalSubject;

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
    /**
     * An exception message if the answer was technically incorrect, but close enough.
     */
    exception: string | false | null;
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
