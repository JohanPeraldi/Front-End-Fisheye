const getPhotographerId = () => {
  const params = (new URL(document.location)).searchParams;
  return +(params.get('id'));
}

const updatePageTitle = (photographerName) => {
  const pageTitleElement = document.querySelector('title');
  pageTitleElement.textContent = 'Fisheye - ' + photographerName;
}

const updatePhotographerRate = (photographerRate) => {
  const dailyRateElement = document.querySelector('.rate');
  dailyRateElement.textContent = photographerRate + '€/jour';
}

const displayPhotographerData = (photographer) => {
  const photographerHeaderElement = document.querySelector('.photographer__header');
  photographerHeaderElement.innerHTML = new PhotographerCard(photographer, 'photographer').createPhotographerCard();
}

const activateModal = () => {
  // Target DOM elements
  const contactButton = document.getElementById('contact_button');
  const closeModalIcon = document.getElementById('close-modal');

  // Open and close modal
  contactButton.addEventListener('click', () => displayModal());
  closeModalIcon.addEventListener('click', () => closeModal());
}

const getPhotographers = () => {
  /**
   * An instance of the PhotographersApi class
   * @type {PhotographersApi}
   * @return A method to fetch photographer objects
   */
  const photographersApiInstance = new PhotographersApi('../data/photographers.json');
  return photographersApiInstance.getPhotographers();
}

const getCurrentPhotographer = () => {
  getPhotographers()
    .then((response) => {
      /**
       * An object containing the current photographer's data
       * @type {Object}
       */
      const currentPhotographer = response.photographers.find(photographer => photographer.id === getPhotographerId());
      console.log(currentPhotographer);
      updatePageTitle(currentPhotographer.name);
      updatePhotographerRate(currentPhotographer.price);
      displayPhotographerData(currentPhotographer);
      activateModal();

      /**
       * An array containing the current photographer's media (images and videos)
       * @type {Array}
       */
      const currentPhotographerMedia = [];
      response.media.forEach(media => {
        if (media.photographerId === getPhotographerId()) {
          currentPhotographerMedia.push(media)
        }
      });
      console.log(currentPhotographerMedia);

      return {currentPhotographer, currentPhotographerMedia};
  })
    .catch((error) => {
      console.log(error);
    })
};

// Data relating to photographers
// response.photographers.forEach(photographer => {
//   if (photographer.id === getPhotographerId()) {
//     const photographerName = photographer.name;
//     const photographerRate = photographer.price;
//
//     // Update page title with current photographer's name
//     updatePageTitle(photographerName);
//
//     // Update info-box with current photographer's daily rate
//     updatePhotographerRate(photographerRate);
//
//     // Call method to create current photographer's card
//     displayPhotographerData(photographer);
//
//     activateModal();
//
//     // return photographer; // Is this needed?
//   }
// });
// Data relating to media (images and videos)
// response.media.forEach(media => {
//   if (media.photographerId === getPhotographerId()) {
//     // For each Media object with a photographerId matching
//     // the id passed as a search parameter,
//     // we create a Media object using the Media Factory
//     return new MediaFactory(media);
//   }
// });

// Display photographer portfolio
// async function displayPhotographerPortfolio(photographerId) {
//   const photographerPortfolio = document.querySelector('.photographer__portfolio-images');
//   photographerPortfolio.innerHTML = new PhotographerPortfolio(photographerId).createPortfolio();
// }

// getPhotographerData();

const init = async () => {
  getCurrentPhotographer();
  return 'Photographer page initialized!';
}

init().then(r => console.log(r));
