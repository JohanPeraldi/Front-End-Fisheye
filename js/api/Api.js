class Api {
  /**
   * Simulate an api by fetching data from a local url
   * @class
   * @param {string} url - The url where the data is located
   */
  constructor(url) {
    this.url = url;
  }

  async get() {
    const response = await fetch(this.url);
    return response.json();
  }
}
