export default class UpdateQuizProgress extends CustomEvent {
  constructor({ percentComplete: e }) {
    super("updateQuizProgress", { detail: { percentComplete: e } });
  }
}
