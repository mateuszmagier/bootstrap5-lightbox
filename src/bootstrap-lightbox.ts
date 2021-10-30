import {BootstrapLightboxConfig} from "./bootstrap-lightbox-config.interface";
import {BootstrapLightboxBuilder} from "./bootstrap-lightbox-builder";
import {LogService} from "./log.service";

export class BootstrapLightbox {

    private clickSelector: string;
    private config: BootstrapLightboxConfig;

    constructor(selector: string, config: BootstrapLightboxConfig) {
        this.clickSelector = selector;
        this.config = config;
    }

    createGallery() {
        this.addAnchorClickEventListener();
    }

    private addAnchorClickEventListener() {
        const clickElement = document.querySelector(this.clickSelector);
        if (clickElement) {
            clickElement.addEventListener('click', () => {
               this.openGallery();
            });
        } else {
            LogService.error(`Couldn't find element ${this.clickSelector}`);
        }
    }

    private openGallery() {
        console.log('open gallery', this.config);
        const lightboxBuilder = new BootstrapLightboxBuilder('body', this.config);
        lightboxBuilder.buildGallery();
    }
}
