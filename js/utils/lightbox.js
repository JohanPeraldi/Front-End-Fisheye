// DOM elements
const lightboxModal = document.getElementById('lightbox-modal');
const closeLightboxElement = document.getElementById('lightbox__close');
const lightboxImageContainer = document.querySelector('.lightbox__image');
const lightboxDescriptionContainer = document.querySelector('.lightbox__description');
const previousImageIcon = document.querySelector('.lightbox__previous');
const nextImageIcon = document.querySelector('.lightbox__next');

// The current photographer's media
let mediaItems;

const fillLightbox = (media) => {
  mediaItems = media;

  return media;
};

// Display media inside lightbox
const displayMedia = (mediaId) => {
  // The current photographer's id
  const photographerId = getPhotographerId();
  // The current image
  const currentMedia = mediaItems.find(item => item.id === +mediaId);
  let filename;
  currentMedia.image ? filename = currentMedia.image : filename = currentMedia.video;
  // The alt text of the current image
  const imageAltText = currentMedia.title;
  // Insert clicked photo or video inside the lightbox
  if (currentMedia.image) {
    lightboxImageContainer.innerHTML = `
      <img src="./assets/images/${photographerId}/${filename}" alt="${imageAltText}">
    `;
  } else {
    lightboxImageContainer.innerHTML = `
      <video controls>
        <source src="./assets/videos/${photographerId}/${filename}">
        Désolé, votre navigateur ne prend pas en charge ce type de média.
      </video>
    `;
  }
  // Insert image description
  lightboxDescriptionContainer.innerHTML = `
    <p>${imageAltText}</p>
  `;
};

// Open lightbox
const openLightbox = (mediaId) => {
  bodyElement.classList.add('no-scroll');
  contentWrapperElement.setAttribute('aria-hidden', 'true');
  lightboxModal.style.display = 'flex';
  lightboxModal.setAttribute('aria-hidden', 'false');
  closeLightboxElement.focus();

  displayMedia(mediaId);
}

// Close lightbox
const closeLightbox = () => {
  bodyElement.classList.remove('no-scroll');
  contentWrapperElement.setAttribute('aria-hidden', 'false');
  lightboxModal.style.display = 'none';
  lightboxModal.setAttribute('aria-hidden', 'true');
  // After closing the lightbox, the focus should be set on the Contact button
  const contactButton = document.getElementById('contact-button');
  contactButton.focus();
}

// Handle click event on media elements
const handleClickOnMedia = ($event) => {
  let clickedItemParentId;
  if ($event.target !== $event.currentTarget) {
    clickedItemParentId = $event.target.parentElement.id;
    openLightbox(clickedItemParentId);
  }
  $event.stopPropagation();

  return clickedItemParentId;
};

// We target the nearest common ancestor of all media elements
const mediaCommonAncestor = document.querySelector('.photographer__portfolio-images');
// We can then add an event listener on that element
// instead of adding multiple event listeners on all media elements
mediaCommonAncestor.addEventListener('click', handleClickOnMedia);

// Activate close button
// 1. Close on mouse click
closeLightboxElement.addEventListener('click', closeLightbox);
// 2. Close on Escape or Enter key press
closeLightboxElement.addEventListener('keydown', $event => {
  const key = $event.key;
  if (key === 'Escape' || key === 'Enter') {
    closeLightbox();
  }
});

// Navigation between images
const handleClickOnPreviousImageIcon = () => {
  console.log('Go to previous image');
  console.log(mediaItems);
  // Steps:
  // 1. Find index of current image
  // 2. Find id of previous image
};

const handleClickOnNextImageIcon = () => {
  console.log('Go to next image');
  console.log(mediaItems);
};

previousImageIcon.addEventListener('click', handleClickOnPreviousImageIcon);
nextImageIcon.addEventListener('click', handleClickOnNextImageIcon);
