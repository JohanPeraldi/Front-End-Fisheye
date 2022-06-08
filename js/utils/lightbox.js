// DOM elements
const lightboxModal = document.getElementById('lightbox-modal');
const closeLightboxElement = document.getElementById('lightbox__close');
const lightboxImageContainer = document.querySelector('.lightbox__image');
const lightboxDescriptionContainer = document.querySelector('.lightbox__description');

// The current photographer's media
let mediaItems;

const fillLightbox = (media) => {
  console.log(media);
  mediaItems = media;

  return media;
};

// Open lightbox
const openLightbox = (mediaId) => {
  console.log('Media id: ' + mediaId);
  // The current photographer's id
  const photographerId = getPhotographerId();
  console.log('Photographer id: ' + photographerId);
  // The current image
  const currentMedia = mediaItems.find(item => item.id === +mediaId);
  console.log(currentMedia);
  let filename;
  currentMedia.image ? filename = currentMedia.image : filename = currentMedia.video;
  // The alt text of the current image
  const imageAltText = currentMedia.title;
  // Insert clicked photo or video inside the lightbox
  if (currentMedia.image) {
    lightboxImageContainer.innerHTML = `
      <img src="/assets/images/${photographerId}/${filename}" alt="${imageAltText}">
    `;
  } else {
    lightboxImageContainer.innerHTML = `
      <video controls>
        <source src="/assets/videos/${photographerId}/${filename}">
        Désolé, votre navigateur ne prend pas en charge ce type de média.
      </video>
    `;
  }
  // Insert image description
  lightboxDescriptionContainer.innerHTML = `
    <p>${imageAltText}</p>
  `;

  bodyElement.classList.add('no-scroll');
  contentWrapperElement.setAttribute('aria-hidden', 'true');
  lightboxModal.style.display = 'flex';
  lightboxModal.setAttribute('aria-hidden', 'false');
  closeLightboxElement.focus();
}

// Close lightbox
const closeLightbox = () => {
  bodyElement.classList.remove('no-scroll');
  contentWrapperElement.setAttribute('aria-hidden', 'false');
  lightboxModal.style.display = 'none';
  lightboxModal.setAttribute('aria-hidden', 'true');
}

// Handle click event on media elements
const handleClickOnMedia = ($event) => {
  // console.log('$event.target.parentElement.classList: ' + $event.target.parentElement.classList);
  // console.log('$event.currentTarget.classList: ' + $event.currentTarget.classList);
  let clickedItemParentId;
  if ($event.target !== $event.currentTarget) {
    // const clickedItem = $event.target.alt;
    clickedItemParentId = $event.target.parentElement.id;
    // console.log('Clicked item alt text: ' + clickedItem);
    // console.log('$event: ' + $event);
    // console.log('Clicked image id: ' + clickedItemParentId);
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
