// Target the form element containing the radio inputs used to change media order
const formElement = document.getElementById('drop-down');

// Event listener on sorting method change (drop-down menu)
formElement.addEventListener('change', () => {
  const sortingMethod = getCheckedRadioElement();
  console.log(`Media should now be sorted by ${sortingMethod}!`);
  // console.log(`Media items: ${mediaItems.forEach(item => console.log(item.title))}`);
  sortMediaItems(mediaItems);
});
