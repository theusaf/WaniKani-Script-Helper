export default class WillShowNextQuestionEvent extends CustomEvent {
  constructor({ subject: e, questionType: t }) {
    super("willShowNextQuestion", { detail: { subject: e, questionType: t } });
  }
}
