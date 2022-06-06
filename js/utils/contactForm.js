// DOM elements
const bodyElement = document.querySelector('body');
const contentWrapperElement = document.getElementById('content-wrapper');
const modal = document.getElementById('contact-modal');
const closeButtonElement = document.getElementById('close-modal');

// Open modal
function displayModal() {
  bodyElement.classList.add('no-scroll');
  contentWrapperElement.setAttribute('aria-hidden', 'true');
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  closeButtonElement.focus();
}

// Close modal
function closeModal() {
  bodyElement.classList.remove('no-scroll');
  contentWrapperElement.setAttribute('aria-hidden', 'false');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}
