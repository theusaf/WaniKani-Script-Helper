export default class DidUpdateUserSynonymsEvent extends CustomEvent {
  constructor({ subjectId: s, synonyms: e }) {
    super("didUpdateUserSynonyms", { detail: { subjectId: s, synonyms: e } });
  }
}
