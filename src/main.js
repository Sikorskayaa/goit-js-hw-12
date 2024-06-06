
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkup} from './js/render-functions';
import { request } from './js/pixabi-api';

const form = document.querySelector('.js-search-form');
const list = document.querySelector('.js-search-list');
const loader = document.querySelector('.js-loader');
const loaderMore = document.querySelector('.js-loader-more');
const searchMore = document.querySelector('.js-search-more');

let page = 1;
let totalPage = 1;
let query = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = form.elements.forSearsh.value.trim();
  if (!query) return;
  if (searchMore.classList.contains('is-active')) {
   searchMore.classList.remove('is-active');
  }
  list.innerHTML = '';
  loader.classList.add('is-active');
  page = 1;

  try {
    const { data } = await request(query, page);
    if (!data.totalHits) {
      loader.classList.remove('is-active');
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      form.reset();
      return;
    }

    list.innerHTML = createMarkup(data.hits);
   loader.classList.remove('is-active');
    searchMore.classList.add('is-active');

    if (data.totalHits < 15) {
     searchMore.classList.remove('is-active');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
});

searchMore.addEventListener('click', async () => {
  loaderMore.classList.add('is-active-more');
  searchMore.classList.remove('is-active');

  try {
    const { data } = await request(query, ++page);
    list.insertAdjacentHTML('beforeend', createMarkup(data.hits));

    loaderMore.classList.remove('is-active-more');
    searchMore.classList.add('is-active');
    lightbox.refresh();

    window.scrollBy({
      top: list.firstChild.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });

    totalPage = Math.ceil(data.totalHits / 15);
    if (totalPage === page) {
     searchMore.classList.remove('is-active');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});