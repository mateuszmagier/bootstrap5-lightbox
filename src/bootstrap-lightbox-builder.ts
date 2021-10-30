import {BootstrapLightboxConfig} from "./bootstrap-lightbox-config.interface";
import {DomHelper} from "./dom-helper";

export class BootstrapLightboxBuilder {

    parentSelector: string;
    config: BootstrapLightboxConfig;

    private currentActiveImage: string;
    private rangeBtnMouseDownInterval: any;

    private parent: any;
    private galleryOverlay: any;
    private galleryContainer: any;

    get logoUri(): string {
        return this.config.logo ? this.config.logo : null;
    }

    get prevImageIndex(): number {
        const currentImageIndex = this.config.data.findIndex(imgPath => imgPath === this.currentActiveImage);
        return currentImageIndex > 0 ? (currentImageIndex - 1) : this.config.data.length - 1;
    }

    get nextImageIndex(): number {
        const currentImageIndex = this.config.data.findIndex(imgPath => imgPath === this.currentActiveImage);
        return (currentImageIndex < this.config.data.length - 1) ? (currentImageIndex + 1) : 0;
    }

    constructor(parentSelector: string, config: BootstrapLightboxConfig) {
        this.parentSelector = parentSelector;
        this.config = config;
        this.currentActiveImage = this.config.data[0];
    }

    buildGallery() {
        this.buildOverlay();
        this.buildGalleryContainer();
        this.setUpControls();
    }

    private buildOverlay() {
        this.galleryOverlay = document.createElement('div');
        this.galleryOverlay.classList.add('bootstrap-lightbox-overlay');
        this.galleryOverlay.id = this.config.name;
        this.parent = document.querySelector(this.parentSelector);
        if (this.parent) {
            this.parent.appendChild(this.galleryOverlay);
        }
    }

    private buildGalleryContainer() {
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.classList.add('bootstrap-lightbox');
        this.galleryContainer.innerHTML = `
            <div class="bootstrap-lightbox__top">
                <div class="bootstrap-lightbox__top__logo">
                    <img class="bootstrap-lightbox__top__logo__img" src="${this.logoUri}" alt="Bootstrap 5 Lightbox logo">
                </div>
                <div class="bootstrap-lightbox__top__image-container">
                    <img class="bootstrap-lightbox__top__image-container__img" src="${this.currentActiveImage}" alt="Bootstrap 5 Lightbox active image">
                </div>
                <div class="bootstrap-lightbox__top__controls">
                    ${this.getControls()}
                </div>
            </div>
            <div class="bootstrap-lightbox__bottom">
                <div class="bootstrap-lightbox__bottom__zoom">
                    <button type="button" id="decreaseZoomBtn" class="btn"><i class="bi bi-dash-circle"></i></button>
                    <input type="range" id="zoomRange" class="form-range bootstrap-lightbox__bottom__zoom-range" value="0">
                    <button type="button" id="increaseZoomBtn" class="btn"><i class="bi bi-plus-circle"></i></button>
                </div>
            </div>
        `;
        this.galleryOverlay.appendChild(this.galleryContainer);
    }

    private getControls(): string {
        return `
            <button type="button" id="prevImageBtn" class="btn"><i class="bi bi-chevron-left"></i></button>
            <button type="button" id="nextImageBtn" class="btn"><i class="bi bi-chevron-right"></i></button>
            <button type="button" id="closeGalleryBtn" class="btn"><i class="bi bi-x-lg"></i></button>
        `;
    }

    private setUpControls() {
        DomHelper.addEventListener('#prevImageBtn', 'click', () => this.setImageAsActive(this.config.data[this.prevImageIndex]));
        DomHelper.addEventListener('#nextImageBtn', 'click', () => this.setImageAsActive(this.config.data[this.nextImageIndex]));
        DomHelper.addEventListener('#closeGalleryBtn', 'click', () => this.closeGallery());
        DomHelper.addEventListener('#zoomRange', 'input', () => this.zoomImage());
        DomHelper.addEventListener('#decreaseZoomBtn', 'click', () => this.decreaseZoom());
        DomHelper.addEventListener('#decreaseZoomBtn', 'mousedown', () => this.onRangeButtonMouseDown(false));
        DomHelper.addEventListener('#decreaseZoomBtn', 'mouseup', () => this.onRangeButtonMouseUp());
        DomHelper.addEventListener('#increaseZoomBtn', 'click', () => this.increaseZoom());
        DomHelper.addEventListener('#increaseZoomBtn', 'mousedown', () => this.onRangeButtonMouseDown(true));
        DomHelper.addEventListener('#increaseZoomBtn', 'mouseup', () => this.onRangeButtonMouseUp());
    }

    private onRangeButtonMouseDown(increase: boolean) {
        this.rangeBtnMouseDownInterval = setInterval(() => {
            increase ? this.increaseZoom() : this.decreaseZoom();
        }, 50);
    }

    private onRangeButtonMouseUp() {
        clearInterval(this.rangeBtnMouseDownInterval);
    }

    private decreaseZoom() {
        const zoomRange: any = document.querySelector('#zoomRange');
        const currentValue = parseInt(zoomRange.value);
        const newValue = currentValue > 0 ? currentValue - 1 : 0;
        zoomRange.value = newValue;
        this.zoomImage();
    }

    private increaseZoom() {
        const zoomRange: any = document.querySelector('#zoomRange');
        const currentValue = parseInt(zoomRange.value);
        const newValue = currentValue < 100 ? currentValue + 1 : 100;
        zoomRange.value = newValue;
        this.zoomImage();
    }

    private setImageAsActive(imagePath: string) {
        const imageElm: any = document.querySelector('.bootstrap-lightbox__top__image-container__img');
        if (imageElm) {
            imageElm['src'] = imagePath;
            this.currentActiveImage = imagePath;
        }
    }

    private zoomImage() {
        const zoomRange: any = document.querySelector('#zoomRange');
        const imageElm: any = document.querySelector('.bootstrap-lightbox__top__image-container__img');
        imageElm.style.transform = `scale(${1 + zoomRange['value'] * 0.02})`;
        console.log(zoomRange['value']);
    }

    private closeGallery() {
        // this.galleryOverlay.classList.add('bootstrap-lightbox-overlay--hidden');
        this.galleryOverlay.remove();
    }
}
