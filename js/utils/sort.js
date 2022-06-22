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
  const checkedItem = radioInputElements.find((item) => item.checked);

  return checkedItem.id;
};

// A function to sort the media items
const sortMediaItems = (mediaItems) => {
  // Which sorting method should be applied ('popularity', 'date' or 'title')
  const sortingMethod = getCheckedRadioElement();
  let sorted;
  /* By popularity (default, from most popular to least popular and,
   * in case of several media with the same number of likes,
   * from most recent to least recent and, in case of another equality,
   * in alphabetical order) */
  if (sortingMethod === 'popularity') {
    sorted = mediaItems.sort((a, b) => {
      if (a.likes < b.likes) {
        return 1;
      }
      if (a.likes === b.likes) {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date === b.date) {
          if (a.title > b.title) {
            return 1;
          }
          return -1;
        }
        return -1;
      }
      return -1;
    });
  } else if (sortingMethod === 'date') {
    /* By date (from most recent to least recent and, in case of several
     * media with the same date, from most popular to least popular and,
     * in case of another equality, in alphabetical order) */
    sorted = mediaItems.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date === b.date) {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes === b.likes) {
          if (a.title > b.title) {
            return 1;
          }
          return -1;
        }
        return -1;
      }
      return -1;
    });
  } else if (sortingMethod === 'title') {
    /* By title (alphabetical order and, in case of several media with the same title,
     * from most recent to least recent and, in case of another equality,
     * from most popular to least popular) */
    sorted = mediaItems.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title === b.title) {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date === b.date) {
          if (a.likes < b.likes) {
            return 1;
          }
          return -1;
        }
        return -1;
      }
      return -1;
    });
  } else {
    // Fallback in case anything goes wrong
    sorted = mediaItems;
  }
  console.group('From sortMediaItems');
  console.log(`Media should be sorted by ${sortingMethod}`);
  console.log(sorted);
  displayPhotographerPortfolio(sorted);

  return sorted;
};
