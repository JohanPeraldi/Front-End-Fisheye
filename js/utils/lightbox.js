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
}

// Close lightbox
const closeLightbox = () => {
  mainElement.style.display = 'block';
  bodyElement.classList.remove('no-scroll');
  contentWrapperElement.setAttribute('aria-hidden', 'false');
  lightboxModal.style.display = 'none';
  lightboxModal.setAttribute('aria-hidden', 'true');
  // After closing the lightbox, the focus should be set on the Contact button
  const contactButton = document.getElementById('contact-button');
  contactButton.focus();
}

// Handle click event on gallery media elements
const handleClickOnMedia = ($event) => {
  const clickedMediaId = $event.target.id;
  openLightbox(clickedMediaId);
  $event.stopPropagation();
  currentMediaId = clickedMediaId;

  return clickedMediaId;
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
  // 1. Find index of current media
  // 1.1 We need the id of the current media
  console.log('Current media id: ' + currentMediaId); // logs the id of the current media
  // 1.2 From there we can find the index of the current media
  const indexOfCurrentMedia = mediaItems.indexOf(mediaItems.find(element => element.id === +currentMediaId));
  console.log('Index of current media: ' + indexOfCurrentMedia); // logs the index of the current media
  // 2. From there, find id of previous media, or last media if current media is first
  // 2.1 From the index of the current media we can find the index of the previous media
  // But we need to take into account the special case of the first media, for which the previous media will be the last media in the list
  let indexOfPreviousMedia;
  if (indexOfCurrentMedia === 0) {
    indexOfPreviousMedia = mediaItems.length - 1;
  } else {
    indexOfPreviousMedia = indexOfCurrentMedia - 1;
  }
  console.log('Index of previous media: ' + indexOfPreviousMedia);
  // 2.2 From the index of the previous media we can find the id of the previous media
  const idOfPreviousMedia = mediaItems[indexOfPreviousMedia].id;
  console.log('Id of previous media: ' + idOfPreviousMedia);
  // 2.3 Now that we have that we want to display the media with that id inside the lightbox
  displayMedia(idOfPreviousMedia);
  // 2.4 We also need to change the id of the current media
  currentMediaId = idOfPreviousMedia;
};

const handleClickOnNextImageIcon = () => {
  console.log('Go to next image');
  console.log(mediaItems);

  // 1. Find index of current media

  // 2. From there, find id of next media, or first media if current media is last
};

previousImageIcon.addEventListener('click', handleClickOnPreviousImageIcon);
nextImageIcon.addEventListener('click', handleClickOnNextImageIcon);
