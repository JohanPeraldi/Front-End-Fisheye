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
      `;
    }
  }

  return {id, photographerId, title, image, video, likes, date, price, getMediaCard};
}
