// DOM elements
const contentWrapperElement = document.getElementById('content-wrapper');
const modal = document.getElementById('contact-modal');
// The list of all elements we want to allow to be focusable inside the modal
const focusableElements = 'img, input, textarea, button';
// The modal focusable elements
const modalFocusableElements = modal.querySelectorAll(focusableElements);
// The first focusable element (the close modal button)
const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
// The last focusable element
const lastFocusableElement = modalFocusableElements[modalFocusableElements.length - 1];

/* Deal with clickable elements that should not be
 * interacted with while modal dialog window is open */
// Store ids of all modal clickable elements
const modalClickableElementsIds = ['contact-modal', 'close-modal', 'first-name', 'last-name', 'email', 'message', 'submit-form'];
/* Among these elements, target those that are
 * outside the modal and store them inside an array */
const deactivatedElements = [];
// A function to remove "clickable" class from elements
const handleClickableElements = (clickableElements) => {
  // Check that deactivated elements have not already been pushed
  if (deactivatedElements.length === 0) {
    clickableElements.forEach((element) => {
      if (!modalClickableElementsIds.includes(element.id)) {
        deactivatedElements.push(element);
      }
    });
    deactivatedElements.forEach((element) => {
      element.classList.remove('clickable');
    });
  } else {
    deactivatedElements.forEach((element) => {
      element.classList.toggle('clickable');
    });
  }
};

// Open modal
const displayModal = () => {
  contentWrapperElement.setAttribute('aria-hidden', 'true');

  // Remove "clickable" class from all elements outside modal
  // Target all elements that have "clickable" class
  const clickableElements = document.querySelectorAll('.clickable');
  handleClickableElements(clickableElements);

  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  document.addEventListener('keydown', (event) => {
    const isTabKeyPressed = event.key === 'Tab';
    if (!isTabKeyPressed) {
      return;
    }
    if (event.shiftKey) {
      // If the Shift key is pressed for Shift-Tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      // If Tab key is pressed
      firstFocusableElement.focus();
      event.preventDefault();
    }
  });
  firstFocusableElement.focus();
};

// Close modal
const closeModal = () => {
  contentWrapperElement.setAttribute('aria-hidden', 'false');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  handleClickableElements(deactivatedElements);
};

// Close modal on click on modal background
modal.addEventListener('click', (event) => {
  if (event.target.id === 'contact-modal') {
    closeModal();
  }
});
