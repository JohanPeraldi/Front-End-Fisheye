const getPhotographerId = () => {
  const params = (new URL(document.location)).searchParams;
  return +(params.get('id'));
};

const updatePageTitle = (photographerName) => {
  const pageTitleElement = document.querySelector('title');
  pageTitleElement.textContent = 'Fisheye - ' + photographerName;
};

const updatePhotographerRate = (photographerRate) => {
  const dailyRateElement = document.querySelector('.rate');
  dailyRateElement.textContent = photographerRate + '€/jour';
};

const displayPhotographerData = (photographer) => {
  const photographerHeaderElement = document.querySelector('.photographer__header');
  photographerHeaderElement.innerHTML = new PhotographerCard(photographer, 'photographer').createPhotographerCard();
};

// Insert the current photographer's name inside the modal title
const updateModal = (photographer) => {
  const modalPhotographerNameElement = document.getElementById('photographer-name');
  modalPhotographerNameElement.textContent = photographer.name;
};

const activateModal = () => {
  // Target DOM elements
  const contactButton = document.getElementById('contact_button');
  const closeModalIcon = document.getElementById('close-modal');

  // Open and close modal
  contactButton.addEventListener('click', () => displayModal());
  closeModalIcon.addEventListener('click', () => closeModal());
};

const getPhotographers = () => {
  /**
   * An instance of the PhotographersApi class
   * @type {PhotographersApi}
   * @return A method to fetch photographer objects
   */
  const photographersApiInstance = new PhotographersApi('../data/photographers.json');
  return photographersApiInstance.getPhotographers();
};

const displayPhotographerPortfolio = (media) => {
  const photographerPortfolioElement = document.querySelector('.photographer__portfolio-images');

  media.forEach((media) => {
    const mediaCardContents = new MediaCard(media).createMediaCard();
    const mediaCard = document.createElement('div');
    mediaCard.setAttribute('class', 'photographer__portfolio-card');
    mediaCard.innerHTML = mediaCardContents;
    photographerPortfolioElement.appendChild(mediaCard);
  });
};

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
      updateModal(currentPhotographer);
      activateModal();

      /**
       * An array containing the current photographer's media (images and videos)
       * @type {Array}
       */
      const currentPhotographerMedia = [];
      response.media.forEach(media => {
        if (media.photographerId === getPhotographerId()) {
          currentPhotographerMedia.push(media);
        }
      });
      console.log(currentPhotographerMedia);
      displayPhotographerPortfolio(currentPhotographerMedia);

      return {currentPhotographer, currentPhotographerMedia};
  })
    .catch((error) => {
      console.log(error);
    })
};

const init = async () => {
  getCurrentPhotographer();
  return 'Photographer page initialized!';
};

init().then(r => console.log(r));
