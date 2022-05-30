// DOM elements
const pageTitleElement = document.querySelector('title');

// Variables used to update the page title
// and other information relating to the photographer
let photographerName, photographerRate;

// Get id of current photographer
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

// Get photographer data
async function getPhotographer() {
  const data = new PhotographersApi('../data/photographers.json');
  const response = await data.get();
  response.photographers.forEach(photographer => {
    if (photographer.id === +id) {
      photographerName = photographer.name;
      photographerRate = photographer.price;

      // Update page title
      pageTitleElement.textContent = 'Fisheye - ' + photographerName;

      // Update info-box with photographer's daily rate
      const dailyRateElement = document.querySelector('.rate');
      dailyRateElement.textContent = photographerRate + '€/jour';

      // Call method to create photographer card on photographer page
      displayPhotographerData(photographer);

      return photographer;
    }
  });
}

// Display photographer data
async function displayPhotographerData(photographer) {
  const photographerCard = document.querySelector('.photographer__header');
  photographerCard.innerHTML = new PhotographerCard(photographer, 'photographer').createPhotographerCard();

  // Target DOM elements created above
  const contactButton = document.getElementById('contact_button');
  const closeModalIcon = document.getElementById('close-modal');

  // Events
  contactButton.addEventListener('click', () => displayModal());
  closeModalIcon.addEventListener('click', () => closeModal());
}

getPhotographer();
