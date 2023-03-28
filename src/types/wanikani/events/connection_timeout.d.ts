declare module "events/connection_timeout" {
  export default class ConnectionTimeout extends CustomEvent<null> {
    constructor();
    type: "connectionTimeout";
  }
}
