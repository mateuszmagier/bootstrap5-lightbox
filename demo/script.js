const images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
];

const { BootstrapLightbox } = BootstrapLightboxModule;

document.addEventListener('DOMContentLoaded', () => {
    console.log('BootstrapLightboxModule', BootstrapLightboxModule);
    const bootstrapLightbox = new BootstrapLightbox('#openGalleryAnchor', {
        name: 'capsGallery',
        logo: 'images/logo.png',
        data: images
    });
    bootstrapLightbox.createGallery();
});
