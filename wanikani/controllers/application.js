import { Application } from "@hotwired/stimulus";
const application = Application.start();
(application.debug = !1), (window.Stimulus = application);
export { application };
