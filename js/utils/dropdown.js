// Target the fieldset element containing the radio inputs used to change media order
const formElement = document.getElementById('drop-down');

// Event listener on sorting method change (drop-down menu)
formElement.addEventListener('change', () => {
  sortMediaItems(mediaItems);
});
