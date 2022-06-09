class PhotographerCard {
  constructor(photographer, page) {
    this._photographer = photographer;
    this._page = page;
  }

  createPhotographerCard() {
    switch (this._page) {
      case('home'):
        return `
          <a href="./photographer.html?id=${this._photographer.id}"
             aria-label="${this._photographer.name}"
             >
             <img src="./assets/photographers/${this._photographer.portrait}" alt="">
             <h2>${this._photographer.name}</h2>
          </a>
          <p class="photographer__location">${this._photographer.city}, ${this._photographer.country}</p>
          <p class="photographer__slogan">${this._photographer.tagline}</p>
          <p class="photographer__rate">${this._photographer.price}€/jour</p>
        `;
      case('photographer'):
        return `
          <div class="photographer__details">
            <h1>${this._photographer.name}</h1>
            <p class="photographer__location">${this._photographer.city}, ${this._photographer.country}</p>
            <p class="photographer__slogan">${this._photographer.tagline}</p>          
          </div>
          <div class="wrapper">
            <button class="contact-button" id="contact-button">Contactez-moi</button>
          </div>
          <div class="photographer__profile-picture">
            <img src="./assets/photographers/${this._photographer.portrait}" alt="${this._photographer.name}">
          </div>
        `;
    }
  }
}
