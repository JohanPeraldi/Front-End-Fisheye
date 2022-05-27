async function getPhotographers() {
  const photographers = new PhotographersApi('../data/photographers.json');
  return photographers.get();
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
