declare module "events/connection_timeout" {
  export default class ConnectionTimeout extends CustomEvent {
    constructor(): ConnectionTimeout;
    type: "connectionTimeout";
  }
}
