async function getPhotographers() {
  const data = '../data/photographers.json';
  const response = await fetch(data);
  const result = await response.json();
  console.log(result);
  return result;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const {photographers} = await getPhotographers();
  displayData(photographers);
}

init();
