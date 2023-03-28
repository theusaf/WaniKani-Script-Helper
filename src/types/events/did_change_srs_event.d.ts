declare module "events/did_change_srs_event" {

  export interface DidChangeSRSEventDetails {
    wentUp: boolean,
    newLevelText: string,
  }

  export default class DidChangeSRSEvent extends CustomEvent<DidChangeSRSEventDetails> {
    constructor(details: DidChangeSRSEventDetails): DidChangeSRSEvent
    type: "didChangeSRS"
  }


}
