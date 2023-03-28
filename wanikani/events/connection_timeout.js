export default class ConnectionTimeout extends CustomEvent {
  constructor() {
    super("connectionTimeout");
  }
}
