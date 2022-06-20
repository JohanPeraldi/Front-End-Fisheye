// Target the form element containing the radio inputs
const formElement = document.getElementById('drop-down');

// Target all three radio input elements
const popularityInputElement = document.getElementById('popularity');
const dateInputElement = document.getElementById('date');
const titleInputElement = document.getElementById('title');

/**
 * A function to check how to sort media items
 * @return {string} The sorting method selected by the user,
 * which is the id of the checked radio input ('popularity', 'date' or 'title')
 */
const getCheckedRadioElement = () => {
  const radioInputElements = [popularityInputElement, dateInputElement, titleInputElement];
  const checkedItem = radioInputElements.find(item => item.checked);
  console.log('Media should be sorted by ' + checkedItem.id);

  return checkedItem.id;
};

formElement.addEventListener('change', () => {
  getCheckedRadioElement();
});

// A function to sort the media items
const sortMediaItems = (mediaItems) => {
  let sorted;
  // By popularity (default, from most popular to least popular
  // and, in case of several media with the same number of likes,
  // from most recent to least recent and, in case of another equality,
  // in alphabetical order)
  if (getCheckedRadioElement() === 'popularity') {
    sorted = mediaItems.sort((a, b) => (a.likes < b.likes) ? 1 : (a.likes === b.likes) ? ((a.date < b.date) ? 1 : (a.date === b.date) ? ((a.title > b.title) ? 1 : -1) : -1) : -1);
  }
  // By date (from most recent to least recent and, in case of several
  // media with the same date, from most popular to least popular and,
  // in case of another equality, in alphabetical order)
  else if (getCheckedRadioElement() === 'date') {
    sorted = mediaItems.sort((a, b) => (a.date < b.date) ? 1 : (a.date === b.date) ? ((a.likes < b.likes) ? 1 : (a.likes === b.likes) ? ((a.title > b.title) ? 1 : -1) : -1) : -1);
  }
  // By title (alphabetical order and, in case of several media with the same title,
  // from most recent to least recent and, in case of another equality, from most
  // popular to least popular)
  else if (getCheckedRadioElement() === 'title') {
    sorted = mediaItems.sort((a, b) => (a.title > b.title) ? 1 : (a.title === b.title) ? ((a.date < b.date) ? 1 : (a.date === b.date) ? ((a.likes < b.likes) ? 1 : -1) : -1) : -1);
  } else {
    sorted = mediaItems;
  }
  console.log(sorted);
  displayPhotographerPortfolio(sorted);

  return sorted;
};
