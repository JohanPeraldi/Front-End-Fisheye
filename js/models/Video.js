class Video extends Media {
  constructor(id, photographerId, title, likes, date, price, video) {
    super(id, photographerId, title, likes, date, price);
    this._video = video;
  }

  get video() {
    return this._video;
  }
}
