import { fetchData } from './js/pixabay-api.js';
import { createMarkup, smoothScroll } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-container');
const list = document.querySelector('.list-photo');
const loader = document.querySelector('.loader');
const loadButton = document.querySelector('.load-more-btn');

loadButton.style.display = 'none';

let page = 1;
let totalHits = 0;
let loadedHits = 0;
let currentSearchQuery = '';

const gallery = new SimpleLightbox('.gallery-link', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', searchPictures);
loadButton.addEventListener('click', loadMorePictures);

async function searchPictures(event) {
  event.preventDefault();
  currentSearchQuery = event.target.elements.query.value.trim();
  if (!currentSearchQuery) {
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
  page = 1;
  loadedHits = 0;

  try {
    const data = await fetchData(currentSearchQuery, page);
    totalHits = data.totalHits;

    if (!totalHits) {
      iziToast.error({
        title: '❌',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 3000,
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutRight',
      });
      loadButton.style.display = 'none';
      return;
    }

    list.innerHTML = createMarkup(data.hits);
    loadedHits = data.hits.length;
    gallery.refresh();

    loadButton.style.display = loadedHits < totalHits ? 'block' : 'none';

    smoothScroll();
  } catch (error) {
    console.error('Error fetching initial pictures:', error);
  } finally {
    loader.style.opacity = '0';
  }
}

async function loadMorePictures() {
  page += 1;

  try {
    const data = await fetchData(currentSearchQuery, page);
    list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    gallery.refresh();

    loadedHits += data.hits.length;

    if (loadedHits >= totalHits) {
      loadButton.style.display = 'none';
      iziToast.info({
        title: '❗',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutRight',
      });
    }

    smoothScroll();
  } catch (error) {
    console.error('Error loading more pictures:', error);
    iziToast.error({
      title: '❌',
      message: 'Failed to load more images. Please try again!',
      position: 'topRight',
      timeout: 3000,
      transitionIn: 'fadeInLeft',
      transitionOut: 'fadeOutRight',
    });
  }
}
