function photographerFactory(data) {
  const {name, id, city, country, tagline, price, portrait} = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const photographerPageLink = document.createElement('a');
    photographerPageLink.setAttribute('href', './photographer.html?id=' + id);
    photographerPageLink.setAttribute('aria-label', name);
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', '');
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const location = document.createElement('p');
    location.setAttribute('class', 'location');
    location.textContent = city + ', ' + country;
    const slogan = document.createElement('p');
    slogan.setAttribute('class', 'slogan');
    slogan.textContent = tagline;
    const rate = document.createElement('p');
    rate.setAttribute('class', 'rate');
    rate.textContent = price + '€/jour';
    article.appendChild(photographerPageLink);
    article.appendChild(location);
    article.appendChild(slogan);
    article.appendChild(rate);
    photographerPageLink.appendChild(img);
    photographerPageLink.appendChild(h2);
    console.group('Photographer data');
    console.log('id: ' + id);
    console.log('city: ' + city);
    console.log('country: ' + country);
    console.log('tagline: ' + tagline);
    console.log('price: ' + price + '€/jour');
    console.groupEnd();
    return (article);
  }

  return {name, id, city, country, tagline, price, picture, getUserCardDOM}
}
