// DOM elements
const pageTitleElement = document.querySelector('title');
const contactButton = document.getElementById('contact_button');
const closeModalIcon = document.getElementById('close-modal');

// Events
contactButton.addEventListener('click', () => displayModal());
closeModalIcon.addEventListener('click', () => closeModal());

// Update page title
const photographerName = 'Update me';
pageTitleElement.textContent = 'Fisheye - ' + photographerName;

let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log('Photographer id: ' + id);

// Get photographer data
async function getPhotographer() {
  const data = '../data/photographers.json';
  const response = await fetch(data);
  const result = await response.json();
  const photographers = result.photographers;
  console.log(photographers); // This is an array of photographers
  // We therefore need to loop through the array to get the data from the
  // selected photographer (using his id)
  photographers.forEach(photographer => {
    if (photographer.id === +id) {
      console.group('Photographer data');
      console.log('Name: ' + photographer.name);
      console.log('Id: ' + photographer.id);
      console.log('City: ' + photographer.city);
      console.log('Country: ' + photographer.country);
      console.log('Tagline: ' + photographer.tagline);
      console.log('Rate: ' + photographer.price + '€/day');
      console.log('Image file: ' + photographer.portrait);
      console.groupEnd();
      return photographer;
    }
  });
}

async function init() {
  // Get photographer data
  const {photographer} = await getPhotographer();
  displayData(photographer);
}

init();
