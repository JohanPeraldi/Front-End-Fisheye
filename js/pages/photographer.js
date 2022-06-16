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

const updatePhotographerLikes = (media) => {
  // Target the DOM element where a photographer's likes is displayed
  const photographerLikesElement = document.querySelector('.info-box .likes span');
  let totalLikes = 0;
  media.forEach(el => totalLikes += el.likes);
  photographerLikesElement.textContent = totalLikes.toString();
  return totalLikes;
}

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
  // 2. With keyboard Escape key
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
      <p>
        <span id="likes-number-${media.id}">${media.likes}</span>
        <img src="./assets/icons/heart-empty.svg" id="likes-${media.id}" class="clickable" alt="likes" tabindex="0">
      </p>
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
      updatePhotographerLikes(currentPhotographerMedia);
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
};

init();
