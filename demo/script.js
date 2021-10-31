const gallery1 = [
    'images/gallery1/1.jpg',
    'images/gallery1/2.jpg',
    'images/gallery1/3.jpg',
    'images/gallery1/4.jpg',
    'images/gallery1/5.jpg',
    'images/gallery1/6.jpg',
    'images/gallery1/7.jpg',
];

const gallery2 = [
    'images/gallery2/1.jpg',
    'images/gallery2/2.jpg',
    'images/gallery2/3.jpg',
    'images/gallery2/4.jpg',
    'images/gallery2/5.jpg',
    'images/gallery2/6.jpg',
    'images/gallery2/7.jpg',
    'images/gallery2/8.jpg',
];

const { BootstrapLightbox } = BootstrapLightboxModule;

document.addEventListener('DOMContentLoaded', () => {
    const bootstrapLightbox1 = new BootstrapLightbox('#openGalleryAnchor1', {
        name: 'capsGallery1',
        logo: 'images/gallery1/logo.png',
        data: gallery1
    });
    bootstrapLightbox1.createGallery();

    const bootstrapLightbox2 = new BootstrapLightbox('#openGalleryAnchor2', {
        name: 'capsGallery2',
        // logo: 'images/gallery2/logo2.png',
        data: gallery2
    });
    bootstrapLightbox2.createGallery();
});
