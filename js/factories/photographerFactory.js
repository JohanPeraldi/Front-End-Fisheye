function photographerFactory(data, page) {
  const {
    name, id, city, country, tagline, price, portrait,
  } = data;

  const pathToProfilePicture = `./assets/photographers/${portrait}`;

  function getPhotographerCard() {
    const article = document.createElement('article');
    if (page === 'home') {
      article.innerHTML = `
        <a href="./photographer.html?id=${id}" class="clickable" aria-label="${name}">
          <img src="${pathToProfilePicture}" alt="">
          <h2>${name}</h2>
        </a>
        <p class="photographer__location">${city}, ${country}</p>
        <p class="photographer__slogan">${tagline}</p>
        <p class="photographer__rate">${price}€/jour</p>
      `;
    }
    if (page === 'photographer') {
      article.setAttribute('class', 'photographer__header');
      article.innerHTML = `
        <div class="photographer__details">
          <h1>${name}</h1>
          <p class="photographer__location">${city}, ${country}</p>
          <p class="photographer__slogan">${tagline}</p>          
        </div>
        <div class="wrapper">
          <button class="contact-button clickable" id="contact-button">Contactez-moi</button>
        </div>
        <div class="photographer__profile-picture">
          <img src="${pathToProfilePicture}" alt="${name}">
        </div>
      `;
    }

    return article;
  }

  return {
    name, id, city, country, tagline, price, pathToProfilePicture, getPhotographerCard,
  };
}
