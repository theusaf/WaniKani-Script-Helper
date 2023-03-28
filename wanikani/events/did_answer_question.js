export default class DidAnswerQuestionEvent extends CustomEvent {
  constructor({ subjectWithStats: t, questionType: e, answer: s, results: n }) {
    super("didAnswerQuestion", {
      detail: { subjectWithStats: t, questionType: e, answer: s, results: n },
    });
  }
}
