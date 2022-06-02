class Image extends Media {
  constructor(id, photographerId, title, likes, date, price, image) {
    super(id, photographerId, title, likes, date, price);
    this._image = image;
  }

  get image() {
    return this._image;
  }
}
