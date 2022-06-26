// Target the fieldset element containing the radio inputs used to change media order
const fieldsetElement = document.getElementById('drop-down');

// Event listener on sorting method change (drop-down menu)
fieldsetElement.addEventListener('change', () => {
  sortMediaItems(mediaItems);
});
