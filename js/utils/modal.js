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

// Open modal
const displayModal = () => {
  contentWrapperElement.setAttribute('aria-hidden', 'true');
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
    } else {
      // If Tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        event.preventDefault();
      }
    }
  });
  firstFocusableElement.focus();
};

// Close modal
const closeModal = () => {
  contentWrapperElement.setAttribute('aria-hidden', 'false');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
};
