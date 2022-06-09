function mediaFactory(media) {
  const {id, photographerId, title, image, video, likes, date, price} = media;

  const pathToImage = `./assets/images/${photographerId}/${image}`;
  const pathToVideo = `./assets/videos/${photographerId}/${video}`;

  function getMediaCard(id) {
    if (image) {
      return `
        <div class="image" id="${id}">
          <img src="${pathToImage}" alt="${title}">
        </div>
        <div class="image-description">
          <h2>${title}</h2>
          <span>${likes}<svg width="24px" height="24px" viewBox="0 0 512 512" fill="#901c1c" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg></span>
        </div>
      `;
    }
    if (video) {
      return  `
        <div class="image" id="${id}">
          <video controls>
            <source src="${pathToVideo}" type="video/mp4">
              Désolé, votre navigateur ne prend pas en charge ce type de média.
          </video>
        </div>
        <div class="image-description">
          <h2>${title}</h2>
          <span>${likes}<svg width="24px" height="24px" viewBox="0 0 512 512" fill="#901c1c" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg></span>
        </div>
      `;
    }
  }

  return {id, photographerId, title, image, video, likes, date, price, getMediaCard};
}
