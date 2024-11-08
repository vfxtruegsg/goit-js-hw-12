export function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" height="152" />
          </a>
          <div class="description">
            <ul class="list-points">
              <li class="items-points"><p>Likes</p><p>${likes}</p></li>
              <li class="items-points"><p>Views</p><p>${views}</p></li>
              <li class="items-points"><p>Comments</p><p>${comments}</p></li>
              <li class="items-points"><p>Downloads</p><p>${downloads}</p></li>
            </ul>
          </div>
        </li>
      `
    )
    .join('');
}

export function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 4.5,
      behavior: 'smooth',
    });
  }
}
