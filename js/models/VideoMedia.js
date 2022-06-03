class VideoMedia extends Media {
  /**
   * @class
   * @augments Media
   * @param {Object} data
   */
  constructor(data) {
    super(data);
    this._video = data.video;
  }

  get video() {
    return this._video;
  }
}
