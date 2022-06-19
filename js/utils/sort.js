// Target the form element containing the radio inputs
const formElement = document.getElementById('drop-down');

// Target all three radio input elements
const popularityInputElement = document.getElementById('popularity');
const dateInputElement = document.getElementById('date');
const titleInputElement = document.getElementById('title');

// A function to check how to sort media items
const getCheckedRadioElement = () => {
  const radioInputElements = [popularityInputElement, dateInputElement, titleInputElement];

  const checkedItem = radioInputElements.find(item => item.checked);
  console.log('Media should be sorted by ' + checkedItem.id);
};

formElement.addEventListener('change', getCheckedRadioElement);
