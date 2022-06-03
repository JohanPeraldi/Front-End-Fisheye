class ImageMedia extends Media {
  /**
   * @class
   * @augments Media
   * @param {Object} data
   */
  constructor(data) {
    super(data);
    this._image = data.image;
  }

  get image() {
    return this._image;
  }
}
