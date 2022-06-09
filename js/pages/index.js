const getPhotographers = () => {
  /**
   * An instance of the PhotographersApi class
   * @type {PhotographersApi}
   * @return A method to fetch photographer objects
   */
  const photographersApiInstance = new PhotographersApi('./data/photographers.json');
  return photographersApiInstance.getPhotographers();
}

/**
 * For each photographer object in the array passed as an argument,
 * a photographer card element will be appended to the photographer section
 * element.
 * @param {Array} photographers - An array containing photographer objects
 * @return {Promise<void>}
 */
const displayData = (photographers) => {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerCard = document.createElement('article');
    photographerCard.innerHTML = new PhotographerCard(photographer, 'home').createPhotographerCard();
    photographersSection.appendChild(photographerCard);
  });
}

const init = async () => {
  /**
   * An array containing photographer objects returned from an api
   * @constant
   * @type {Array}
   */
  const {photographers} = await getPhotographers();
  await displayData(photographers);
  return 'Homepage initialized!';
}

init().then(r => console.log(r));
