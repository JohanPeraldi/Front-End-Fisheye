// DOM elements
const pageTitleElement = document.querySelector('title');
// const contactButton = document.getElementById('contact_button');
// const closeModalIcon = document.getElementById('close-modal');

// Events
// contactButton.addEventListener('click', () => displayModal());
// closeModalIcon.addEventListener('click', () => closeModal());

// Update page title
let photographerName = 'Update me';

// Get id of current photographer
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log('Photographer id: ' + id);

// Get photographer data
async function getPhotographer() {
  const data = new PhotographersApi('../data/photographers.json');
  const response = await data.get();
  response.photographers.forEach(photographer => {
    if (photographer.id === +id) {
      console.group('Photographer data');
      console.log('Name: ' + photographer.name);
      console.log('Id: ' + photographer.id);
      console.log('City: ' + photographer.city);
      console.log('Country: ' + photographer.country);
      console.log('Tagline: ' + photographer.tagline);
      console.log('Rate: ' + photographer.price + '€/day');
      console.log('Image file: ' + photographer.portrait);
      console.log('Photographer: ' + photographer);
      console.groupEnd();
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
}

getPhotographer();
