export default class DidChangeSRSEvent extends CustomEvent {
  constructor({ wentUp: e, newLevelText: t }) {
    super("didChangeSRS", { detail: { wentUp: e, newLevelText: t } });
  }
}
