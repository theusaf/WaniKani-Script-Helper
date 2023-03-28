declare module "events/did_change_srs_event" {
  export interface DidChangeSRSEventDetails {
    /**
     * Whether the SRS level went up or down
     */
    wentUp: boolean;
    /**
     * The new SRS level text (e.g. 'Apprentice', 'Guru', etc.)
     */
    newLevelText: string;
  }

  export default class DidChangeSRSEvent extends CustomEvent<DidChangeSRSEventDetails> {
    constructor(details: DidChangeSRSEventDetails);
    type: "didChangeSRS";
  }
}
