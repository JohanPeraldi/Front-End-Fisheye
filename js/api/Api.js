// Simulates an api
// Fetch data from json file

class Api {
  /**
   * @param {string} url - The url where the data can be found
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    const response = await fetch(this._url);
    return await response.json();
  }
}

class PhotographersApi extends Api {
  /**
   * @param {string} url - The url where the photographers' data is located
   */
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    return await this.get();
  }
}
