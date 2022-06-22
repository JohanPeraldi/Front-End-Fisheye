function mediaFactory(media) {
  const {
    id, photographerId, title, image, video, likes, date, price,
  } = media;

  const pathToImage = `./assets/images/${photographerId}/${image}`;
  const pathToVideo = `./assets/videos/${photographerId}/${video}`;

  function getMediaCard(mediaId) {
    let mediaCard;
    if (image) {
      mediaCard = `
        <div class="image clickable" id="${mediaId}" tabindex="0">
          <img src="${pathToImage}" alt="${title}">
        </div>
      `;
    }
    if (video) {
      mediaCard = `
        <div class="image clickable" id="${mediaId}" tabindex="0">
          <video controls>
            <source src="${pathToVideo}" type="video/mp4">
              Désolé, votre navigateur ne prend pas en charge ce type de média.
          </video>
        </div>
      `;
    }

    return mediaCard;
  }

  return {
    id, photographerId, title, image, video, likes, date, price, getMediaCard,
  };
}
