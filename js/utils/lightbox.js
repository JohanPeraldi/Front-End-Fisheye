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

// Handle gallery media selection
const handleMediaSelection = ($event) => {
  const clickedMediaId = $event.target.id;
  // We want to handle both click events and keydown events
  // but, in case of keydown events, only when key is 'Enter'
  if ($event.type === 'click' || $event.type === 'keydown' && $event.key === 'Enter') {
    openLightbox(clickedMediaId);
    $event.stopPropagation();
    currentMediaId = clickedMediaId;
  }
};

// We target the nearest common ancestor of all media elements
const mediaCommonAncestor = document.querySelector('.photographer__portfolio-images');
// We can then add an event listener on that element
// instead of adding multiple event listeners on all media elements
// 1. Open lightbox on mouse click on media in gallery
mediaCommonAncestor.addEventListener('click', handleMediaSelection);
// 2. Open lightbox with keyboard
mediaCommonAncestor.addEventListener('keydown', handleMediaSelection);

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
  // 2.3 Now that we have that, we want to display the media with that id inside the lightbox
  displayMedia(idOfPreviousMedia);
  // 2.4 We also need to change the id of the current media
  currentMediaId = idOfPreviousMedia;
};

const handleClickOnNextImageIcon = () => {
  console.log('Go to next image');
  console.log(mediaItems);

  // 1. Find index of current media
  // 1.1 We need the id of the current media
  console.log('Current media id: ' + currentMediaId);
  // 1.2 From there we can find the index of the current media
  const indexOfCurrentMedia = mediaItems.indexOf(mediaItems.find(element => element.id === +currentMediaId));
  console.log('Index of current media: ' + indexOfCurrentMedia);
  // 2. From there, find id of next media, or first media if current media is last
  // 2.1 From the index of the current media we can find the index of the next media
  // But we need to take into account the special case of the last media, for which the next media will be the first media in the list
  let indexOfNextMedia;
  if (indexOfCurrentMedia === mediaItems.length - 1) {
    indexOfNextMedia = 0;
  } else {
    indexOfNextMedia = indexOfCurrentMedia + 1;
  }
  console.log('Index of next media: ' + indexOfNextMedia);
  // 2.2 From the index of the next media we can find the id of the next media
  const idOfNextMedia = mediaItems[indexOfNextMedia].id;
  console.log('Id of next media: ' + idOfNextMedia);
  // 2.3 Now that we have that, we want to display the media with that id inside the lightbox
  displayMedia(idOfNextMedia);
  // 2.4 We also need to change the id of the current media
  currentMediaId = idOfNextMedia;
};

previousImageIcon.addEventListener('click', handleClickOnPreviousImageIcon);
nextImageIcon.addEventListener('click', handleClickOnNextImageIcon);

// 2. Keyboard events
// The navigation between images should be handled at the lightbox level itself
// and not at the navigation icon level. We want to be able to use the arrow keys
// to navigate between images even if the focus is not set on the icons.
// The event handler function
const handleKeyboardNavigation = ($event) => {
  if ($event.key === 'ArrowLeft') {
    console.log('From handleKeyboardNavigation function: Go to PREVIOUS image');
    // Steps:
    // 1. Find index of current media
    // 1.1 We need the id of the current media
    // 1.2 From there we can find the index of the current media
    const indexOfCurrentMedia = mediaItems.indexOf(mediaItems.find(element => element.id === +currentMediaId));
    // 2. From there, find id of previous media, or last media if current media is first
    // 2.1 From the index of the current media we can find the index of the previous media
    // But we need to take into account the special case of the first media, for which the previous media will be the last media in the list
    let indexOfPreviousMedia;
    if (indexOfCurrentMedia === 0) {
      indexOfPreviousMedia = mediaItems.length - 1;
    } else {
      indexOfPreviousMedia = indexOfCurrentMedia - 1;
    }
    // 2.2 From the index of the previous media we can find the id of the previous media
    const idOfPreviousMedia = mediaItems[indexOfPreviousMedia].id;
    // 2.3 Now that we have that, we want to display the media with that id inside the lightbox
    displayMedia(idOfPreviousMedia);
    // 2.4 We also need to change the id of the current media
    currentMediaId = idOfPreviousMedia;
  } else if ($event.key === 'ArrowRight') {
    console.log('From handleKeyboardNavigation function: Go to NEXT image');
    // 1. Find index of current media
    // 1.1 We need the id of the current media
    // 1.2 From there we can find the index of the current media
    const indexOfCurrentMedia = mediaItems.indexOf(mediaItems.find(element => element.id === +currentMediaId));
    // 2. From there, find id of next media, or first media if current media is last
    // 2.1 From the index of the current media we can find the index of the next media
    // But we need to take into account the special case of the last media, for which the next media will be the first media in the list
    let indexOfNextMedia;
    if (indexOfCurrentMedia === mediaItems.length - 1) {
      indexOfNextMedia = 0;
    } else {
      indexOfNextMedia = indexOfCurrentMedia + 1;
    }
    // 2.2 From the index of the next media we can find the id of the next media
    const idOfNextMedia = mediaItems[indexOfNextMedia].id;
    // 2.3 Now that we have that, we want to display the media with that id inside the lightbox
    displayMedia(idOfNextMedia);
    // 2.4 We also need to change the id of the current media
    currentMediaId = idOfNextMedia;
  }
};

lightboxModal.addEventListener('keydown', handleKeyboardNavigation);
