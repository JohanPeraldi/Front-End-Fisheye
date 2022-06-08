// DOM elements
const lightboxModal = document.getElementById('lightbox-modal');
const closeLightboxElement = document.getElementById('lightbox__close');

// Open lightbox
const openLightbox = () => {
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
  console.log('$event.target.parentElement.classList: ' + $event.target.parentElement.classList);
  console.log('$event.currentTarget.classList: ' + $event.currentTarget.classList);
  if ($event.target !== $event.currentTarget) {
    const clickedItem = $event.target.alt;
    const clickedItemParentsId = $event.target.parentElement.id;
    console.log('Clicked item alt text: ' + clickedItem);
    console.log('$event: ' + $event);
    console.log('Clicked image id: ' + clickedItemParentsId);
    openLightbox();
  }
  $event.stopPropagation();
};

// We target the nearest common ancestor of all media elements
const mediaCommonAncestor = document.querySelector('.photographer__portfolio-images');
// We can then add an event listener on that element
// instead of adding multiple event listeners on all media elements
mediaCommonAncestor.addEventListener('click', handleClickOnMedia);

// Activate close button
closeLightboxElement.addEventListener('click', closeLightbox);
