function photographerFactory(data) {
  const {name, id, city, country, tagline, price, portrait} = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute("src", picture)
    const h2 = document.createElement('h2');
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    console.group('Photographer data');
    console.log('id: ' + id);
    console.log('city: ' + city);
    console.log('country: ' + country);
    console.log('tagline: ' + tagline);
    console.log('price: ' + price + '€/jour');
    console.groupEnd();
    return (article);
  }

  return {name, picture, getUserCardDOM}
}
