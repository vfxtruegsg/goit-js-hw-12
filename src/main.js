// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import fetchData from './js/pixabay-api';
import createMarkup from './js/render-functions';

const form = document.querySelector('.search-container');
const list = document.querySelector('.list-photo');
const loader = document.querySelector('.loader');

form.addEventListener('submit', searchPictures);

function searchPictures(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.query.value.trim();
  if (!searchQuery) {
    iziToast.error({
      title: '❌',
      message: 'Please enter your request',
      position: 'topRight',
      timeout: 3000,
      transitionIn: 'fadeInLeft',
      transitionOut: 'fadeOutRight',
    });
    return;
  }
  loader.style.opacity = '1';
  fetchData(searchQuery)
    .then(data => {
      if (!data.total) {
        iziToast.error({
          title: '❌',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 3000,
          transitionIn: 'fadeInLeft',
          transitionOut: 'fadeOutRight',
        });
      }

      list.innerHTML = createMarkup(data.hits);
      gallery.refresh();
    })
    .catch(error => {
      throw new Error(error);
    })
    .finally(() => {
      loader.style.opacity = '0';
    });
}

const gallery = new SimpleLightbox('.gallery-link', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
