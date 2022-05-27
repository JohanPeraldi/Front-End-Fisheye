class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    // Contents of PhotographersFactory.js
    // relating to card creation transferred here
    return `
      <a href="photographer.html?id=${this._photographer.id}"
         aria-label="${this._photographer.name}"
         >
         <img src="assets/photographers/${this._photographer.portrait}" alt="">
         <h2>${this._photographer.name}</h2>
      </a>
      <p class="location">${this._photographer.city}, ${this._photographer.country}</p>
      <p class="slogan">${this._photographer.tagline}</p>
      <p class="rate">${this._photographer.price}€/jour</p>
    `;
  }
}
