import {LogService} from "./log.service";

export class DomHelper {

    static addEventListener(selector: string, eventType: string, callback: (event?: any) => void) {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener(eventType, callback);
        } else {
            LogService.error(`Can't register event listener - selector ${selector} not found`);
        }
    }
}
