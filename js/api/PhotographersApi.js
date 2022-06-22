class PhotographersApi extends Api {
  /**
   * Simulate an api by fetching data relating to photographers from a local url
   * @class
   * @augments Api
   */
  async getPhotographers() {
    return this.get();
  }
}
