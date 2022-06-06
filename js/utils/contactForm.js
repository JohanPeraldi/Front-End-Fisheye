// DOM ELEMENTS
// 1. Form input elements
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const inputElements = [firstNameInput, lastNameInput, emailInput, messageInput];
// 2. Contact form
const form = document.getElementById('contact-form');

// Record user input
const userInput = [
  {
    name: 'First name',
    text: null,
  },
  {
    name: 'Last name',
    text: null,
  },
  {
    name: 'Email',
    text: null,
  },
  {
    name: 'Message',
    text: null,
  }
];
const saveUserInput = (elements) => {
  elements.forEach((element, index) => element.addEventListener('blur', ($event) => {
    userInput[index].text = $event.target.value;
  }));
};
saveUserInput(inputElements);

// Log user input
const logUserInput = (inputs) => {
  form.addEventListener('submit', ($event) => {
    $event.preventDefault();
    console.group('User input');
    inputs.forEach((input) => console.log(`${input.name}: ${input.text}`));
    console.groupEnd();
    closeModal();
  });
};
logUserInput(userInput);
