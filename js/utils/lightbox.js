// DOM elements
const mainElement = document.getElementById('main');
const lightboxModal = document.getElementById('lightbox-modal');
const closeLightboxElement = document.getElementById('lightbox__close');
const lightboxImageContainer = document.querySelector('.lightbox__image');
const lightboxDescriptionContainer = document.querySelector('.lightbox__description');
const previousImageIcon = document.querySelector('.lightbox__previous');
const nextImageIcon = document.querySelector('.lightbox__next');

// The current photographer's media
let mediaItems;

// We need to store the current media id to be able to retrieve it
// with handleClickOnPreviousImageIcon and handleClickOnNextImageIcon
let currentMediaId;

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
      <img src="./assets/images/${photographerId}/${filename}" class="clickable" alt="${imageAltText}">
    `;
  } else {
    lightboxImageContainer.innerHTML = `
      <video class="clickable" controls>
        <source src="./assets/videos/${photographerId}/${filename}">
        Désolé, votre navigateur ne prend pas en charge ce type de média.
      </video>
    `;
  }
  // Insert image description
  lightboxDescriptionContainer.innerHTML = `
    <p>${imageAltText}</p>
  `;

  return mediaId;
};

// Open lightbox
const openLightbox = (mediaId) => {
  mainElement.style.display = 'none';
  bodyElement.classList.add('no-scroll');
  contentWrapperElement.setAttribute('aria-hidden', 'true');
  lightboxModal.style.display = 'flex';
  lightboxModal.setAttribute('aria-hidden', 'false');
  closeLightboxElement.focus();

  displayMedia(mediaId);
};

// Close lightbox
const closeLightbox = () => {
  mainElement.style.display = 'block';
  bodyElement.classList.remove('no-scroll');
  contentWrapperElement.setAttribute('aria-hidden', 'false');
  lightboxModal.style.display = 'none';
  lightboxModal.setAttribute('aria-hidden', 'true');
  // After closing the lightbox, the focus should be set on the Contact button
  const contactButton = document.getElementById('contact-button');
  contactButton.focus(); // This causes a bug when we use the Enter key to close the lightbox:
  // the contact form opens!
};

// Handle all events originating in the media gallery
const handleImageGalleryEvents = ($event) => {
  // First, check what element was clicked
  console.log($event);
  console.log('$event.target.id: \n' + $event.target.id);
  // Media selection events
  if ($event.target.localName === 'div') {
    const clickedMediaId = $event.target.id;
    // We want to handle both click events and keydown events
    // but, in case of keydown events, only when key is 'Enter'
    if ($event.type === 'click' || $event.type === 'keydown' && $event.key === 'Enter') {
      openLightbox(clickedMediaId);
      currentMediaId = clickedMediaId;
    }
  }
  // Media like events
  else if ($event.target.localName === 'img') {
    const mediaId = $event.path[3].firstElementChild.id;
    if ($event.type === 'click') {
      console.group('Like icon was clicked!');
      console.log('You want to like image/video with id: ' + mediaId);
      console.groupEnd();
    }
  $event.stopPropagation();
  }
};

// We target the nearest common ancestor of all media elements
const mediaCommonAncestor = document.querySelector('.photographer__portfolio-images');
// We can then add an event listener on that element
// instead of adding multiple event listeners on all media elements
// 1. Open lightbox on mouse click on media in gallery
mediaCommonAncestor.addEventListener('click', handleImageGalleryEvents);
// 2. Open lightbox with keyboard
mediaCommonAncestor.addEventListener('keydown', handleImageGalleryEvents);

// Activate close button
// 1. With mouse click
closeLightboxElement.addEventListener('click', closeLightbox);
// 2. By pressing Enter
closeLightboxElement.addEventListener('keydown', $event => {
  if ($event.key === 'Enter') {
    closeLightbox();
  }
});
// Close on Escape keydown wherever the focus is set
lightboxModal.addEventListener('keydown', $event => {
  const key = $event.key;
  if (key === 'Escape') {
    closeLightbox();
  }
});

// Navigation between images
// 1. Mouse events
previousImageIcon.addEventListener('click', handleLightboxNavigation);
nextImageIcon.addEventListener('click', handleLightboxNavigation);
// 2. Keyboard events
lightboxModal.addEventListener('keydown', handleLightboxNavigation);
