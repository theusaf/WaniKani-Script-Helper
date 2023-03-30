 interface PronounciationSource {
  url: string;
  content_type: string;
}

 interface Pronounciation {
  actor: {
    id: number;
  };
  sources: PronounciationSource[];
}

 interface Reading {
  reading: string;
  pronounciations: Pronounciation[];
}

 interface Chactacters {
  url: string;
  meaning: string;
}

 interface AuxiliaryData {
  type: string;
  message: string;
}
 interface AuxiliaryReading extends AuxiliaryData {
  reading: string;
}
 interface AuxiliaryMeaning extends AuxiliaryData {
  meaning: string;
}

interface Subject {
  id: number;
  readings?: Reading[];
  meanings: string[]; // verify this
  subject_category: string;
  characters?: string | Chactacters;
  type: "Kanji" | "Vocabulary";
  primary_reading_type?: "onyomi" | "kunyomi" | "nanori";
  onyomi?: string[];
  kunyomi?: string[];
  nanori?: string[];
  kanji?: string[];
  auxiliary_meanings?: AuxiliaryMeaning[];
  auxiliary_readings?: AuxiliaryReading[];
}
