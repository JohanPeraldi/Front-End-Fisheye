class MediaCard {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._image = data.image;
    this._video = data.video;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
  }

  createMediaCard() {
    if (this._image) {
      return `
        <div class="image">
          <img src="assets/images/${this._photographerId}/${this._image}" alt="${this._title}">
        </div>
        <div class="image-description">
          <h2>${this._title}</h2>
          <span>${this._likes}<svg width="24px" height="24px" viewBox="0 0 512 512" fill="#901c1c" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg></span>
        </div>
      `;
    } else if (this._video) {
      return  `
        <div class="image">
          <video controls preload="none" poster="assets/images/${this._photographerId}/${(this._video).slice(0, -3)}jpg">
            <source src="assets/videos/${this._photographerId}/${this._video}" type="video/mp4">
              Désolé, votre navigateur ne prend pas en charge ce type de média.
          </video>
        </div>
        <div class="image-description">
          <h2>${this._title}</h2>
          <span>${this._likes}<svg width="24px" height="24px" viewBox="0 0 512 512" fill="#901c1c" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg></span>
        </div>
      `;
    }
  }
}
