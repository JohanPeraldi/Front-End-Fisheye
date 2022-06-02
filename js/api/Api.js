// Simulates an api
// Fetch data from json file

class Api {
  /**
   * Simulate an api by fetching data from a local url
   * @class
   * @param {string} url - The url where the data is located
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    const response = await fetch(this._url);
    return response.json();
  }
}

class PhotographersApi extends Api {
  /**
   * Simulate an api by fetching data relating to photographers from a local url
   * @class
   * @augments Api
   * @param {string} url - The url where the photographers' data is located
   */
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    return this.get();
  }
}
