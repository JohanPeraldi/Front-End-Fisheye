// The MediaFactory will be called by the getPhotographer function
// in photographer.js.
// For each media object, the factory will create either an Image object
// either a Video object, depending on the existing property of that media.
// Keep in mind that for Video media, a thumbnail image should be displayed.

class MediaFactory {
  /**
   * @class
   * @param {object} media
   * @returns {Image|Video}
   */
  constructor(media) {
    // Two media types should be handled: images & videos
    if (media.image) {
      console.log('Image: ' + media.image);
      // Create an Image object
      return new Image(media);
    } else if (media.video) {
      console.log('Video: ' + media.video);
      // Create a Video object
      return new Video(media);
    } else {
      throw 'Unknown videos format';
    }
  }
}
