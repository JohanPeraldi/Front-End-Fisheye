// DOM elements
const contentWrapperElement = document.getElementById('content-wrapper');
const modal = document.getElementById('contact-modal');
const closeButtonElement = document.getElementById('close-modal');

// Open modal
const displayModal = () => {
  contentWrapperElement.setAttribute('aria-hidden', 'true');
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  closeButtonElement.focus();
};

// Close modal
const closeModal = () => {
  contentWrapperElement.setAttribute('aria-hidden', 'false');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
};
