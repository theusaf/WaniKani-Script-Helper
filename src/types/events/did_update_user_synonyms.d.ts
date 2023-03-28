declare module "events/did_update_user_synonyms" {
  export interface DidUpdateUserSynonymsEventDetails {
    synonyms: string[];
    subjectId: number;
  }

  export default class DidUpdateUserSynonymsEvent extends CustomEvent<DidUpdateUserSynonymsEventDetails> {
    constructor(details: DidUpdateUserSynonymsEventDetails);
    type: "didUpdateUserSynonyms";
  }
}
