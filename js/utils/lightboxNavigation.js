/**
 * A handler function to navigate inside the lightbox by clicking
 * on previous and next arrow icons or by using left and right arrow keys
 */
const handleLightboxNavigation = ($event) => {
  // 1. Find index of current media
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
  // 3. From there, find id of next media, or first media if current media is last
  // 3.1 From the index of the current media we can find the index of the next media
  // But we need to take into account the special case of the last media, for which the next media will be the first media in the list
  let indexOfNextMedia;
  if (indexOfCurrentMedia === mediaItems.length - 1) {
    indexOfNextMedia = 0;
  } else {
    indexOfNextMedia = indexOfCurrentMedia + 1;
  }
  // 3.2 From the index of the next media we can find the id of the next media
  const idOfNextMedia = mediaItems[indexOfNextMedia].id;

  // HANDLE CLICK EVENTS
  if ($event.type === 'click') {
    // Here we need to check which of the two icons was clicked
    // in order to display either the previous or next image
    // and update currentMediaId
    if ($event.target.classList.contains('lightbox__previous')) {
      displayMedia(idOfPreviousMedia);
      currentMediaId = idOfPreviousMedia;
    } else if ($event.target.classList.contains('lightbox__next')) {
      displayMedia(idOfNextMedia);
      currentMediaId = idOfNextMedia;
    }
  }
  // HANDLE KEYBOARD EVENTS
  else if ($event.type === 'keydown') {
    // Code from handleKeyboardNavigation
    if ($event.key === 'ArrowLeft') {
      displayMedia(idOfPreviousMedia);
      currentMediaId = idOfPreviousMedia;
    } else if ($event.key === 'ArrowRight') {
      displayMedia(idOfNextMedia);
      currentMediaId = idOfNextMedia;
    }
  }
};
