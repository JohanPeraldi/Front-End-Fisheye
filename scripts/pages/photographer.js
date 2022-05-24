// DOM elements
const contactButton = document.getElementById('contact_button');
const closeModalIcon = document.getElementById('close-modal');

// Events
contactButton.addEventListener('click', () => displayModal());
closeModalIcon.addEventListener('click', () => closeModal());
