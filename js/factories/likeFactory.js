function likeFactory(isLiked) {
  const likeIconSrc = './assets/icons/heart-full.svg';
  const dislikeIconSrc = './assets/icons/heart-empty.svg';

  if (isLiked) {
    return likeIconSrc;
  }
  return dislikeIconSrc;
}
