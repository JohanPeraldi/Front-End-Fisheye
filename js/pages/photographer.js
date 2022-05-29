// DOM elements
const pageTitleElement = document.querySelector('title');

// Update page title
let photographerName = 'Update me';

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
      pageTitleElement.textContent = 'Fisheye - ' + photographerName;

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
