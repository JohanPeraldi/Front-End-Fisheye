class MediaFactory {
  /**
   * The MediaFactory takes as an argument an array
   * containing all the media of a specific photographer.
   * It will create either an ImageMedia object
   * either a VideoMedia object, depending on the existing
   * property of that media.
   * @class
   * @param {Array} media
   * @returns {ImageMedia|VideoMedia}
   */
  constructor(media) {
    // Two media types should be handled: images & videos
    if (media.image) {
      // console.log('Image: ' + media.image);
      // Create an ImageMedia object
      return new ImageMedia(media);
    } else if (media.video) {
      // console.log('Video: ' + media.video);
      // Create a VideoMedia object
      return new VideoMedia(media);
    } else {
      throw 'Unknown media format';
    }
  }
}
