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
  const main = document.getElementById('main');
  const photographerCard = photographerFactory(photographer, 'photographer').getPhotographerCard();
  main.prepend(photographerCard);
};

// Insert the current photographer's name inside the modal title
const updateModal = (photographer) => {
  const modalPhotographerNameElement = document.getElementById('photographer-name');
  modalPhotographerNameElement.textContent = photographer.name;
};

const activateModal = () => {
  // Target DOM elements
  const contactButton = document.getElementById('contact-button');
  const closeModalIcon = document.getElementById('close-modal');

  // Set focus on contactButton
  contactButton.focus();

  // Open modal
  contactButton.addEventListener('click', () => displayModal());

  // Close modal
  // 1. With mouse click
  closeModalIcon.addEventListener('click', () => closeModal());
  // 2. With keyboard Escape or Enter keys
  closeModalIcon.addEventListener('keydown', event => {
    const key = event.key;
    if (key === 'Escape') {
      closeModal();
      contactButton.focus();
    }
  })
};

const getPhotographers = () => {
  /**
   * An instance of the PhotographersApi class
   * @type {PhotographersApi}
   * @return A method to fetch photographer objects
   */
  const photographersApiInstance = new PhotographersApi('data/photographers.json');
  return photographersApiInstance.getPhotographers();
};

const displayPhotographerPortfolio = (media) => {
  const photographerPortfolioElement = document.querySelector('.photographer__portfolio-images');

  media.forEach((media) => {
    // Get the adequate media card (image or video) from the factory
    const mediaCardContents = mediaFactory(media).getMediaCard(media.id);
    const mediaCard = document.createElement('div');
    mediaCard.setAttribute('class', 'photographer__portfolio-card');
    mediaCard.innerHTML = mediaCardContents;
    // Create the media description element
    const mediaDescriptionElement = document.createElement('div');
    mediaDescriptionElement.setAttribute('class', 'image-description');
    mediaDescriptionElement.innerHTML = `
      <h2>${media.title}</h2>
      <span>${media.likes}<svg width="24px" height="24px" viewBox="0 0 512 512" fill="#901c1c" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg></span>
    `;
    // Add it to the media card
    mediaCard.appendChild(mediaDescriptionElement);
    // Add the media card to the DOM
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
      displayPhotographerPortfolio(currentPhotographerMedia);
      fillLightbox(currentPhotographerMedia);

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
