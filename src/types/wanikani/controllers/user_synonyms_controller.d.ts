declare module "controllers/user_synonyms_controller" {
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static values: ValueDefinitionMap;
    get synonymTarget(): HTMLElement;
    get synonymTargets(): HTMLElement[];
    get hasSynonymTarget(): boolean;
    get subjectIdValue(): number;
    set subjectIdValue(value: number);
    get hasSubjectIdValue(): boolean;
    connect(): void;
  }
}
