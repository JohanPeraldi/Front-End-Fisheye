// Target the fieldset element containing the radio inputs used to change media order
const fieldsetElement = document.getElementById('drop-down');

// Event listener on sorting method change (drop-down menu)
fieldsetElement.addEventListener('change', () => {
  sortMediaItems(mediaItems);
});

// Change value of aria-expanded attribute to 'true' when fieldset element is focused
fieldsetElement.addEventListener('focus', () => {
  fieldsetElement.setAttribute('aria-expanded', 'true');
});

// Reset value of aria-expanded attribute to 'false' when fieldset element is not focused
fieldsetElement.addEventListener('blur', () => {
  fieldsetElement.setAttribute('aria-expanded', 'false');
});
