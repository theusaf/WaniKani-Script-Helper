export default class DidCompleteSubjectEvent extends CustomEvent {
  constructor({ subjectWithStats: t }) {
    super("didCompleteSubject", { detail: { subjectWithStats: t } });
  }
}
