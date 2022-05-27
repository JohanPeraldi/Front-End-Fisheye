async function getPhotographers() {
  // Refactor -> transfer to Api.js
  const data = '../data/photographers.json';
  const response = await fetch(data);
  return await response.json();
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerCard = document.createElement('article');
    photographerCard.innerHTML = new PhotographerCard(photographer).createPhotographerCard();
    photographersSection.appendChild(photographerCard);
  });
}

async function init() {
  // Get photographers data
  const {photographers} = await getPhotographers();
  displayData(photographers);
}

init();
