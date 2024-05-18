import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// import { request } from "./js/pixabi-api";
import { createMarkup } from "./js/render-functions";

const form = document.querySelector('.submit-form');
const list = document.querySelector('.gallery');
const loadBtn = document.querySelector('.js-load-btn')
const loading = document.querySelector('.js-loading')

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoad)

let inputValue;
let currentPage = 1;
let perPage = 20;

function onLoad() { 
    currentPage += 1;
    request(inputValue)
      .then(data => {
              list.insertAdjacentHTML(`beforeend`,createMarkup(data.hits))
              init();
              const card = document.querySelector(`.gallery-item`).getBoundingClientRect().height;
        window.scrollBy(
          {
                  top: card * 2,
                  behavior: `smooth`
          });
                    })
          .catch(err => console.log(err))
     
  }

function onSubmit(evt) {
    evt.preventDefault();
    
    loading.innerHTML = `<span class="loader"></span>`;
    if (evt.currentTarget.elements.search.value !== inputValue) {
        list.innerHTML = ``;
        currentPage = 1;
      }
      inputValue = evt.currentTarget.elements.search.value;

    if(inputValue.length === 0){
        return
    }

    request(inputValue)
        .then(data => {
            if (data.hits.length === 0){
                 iziToast.show({
                    message: ' Sorry, there are no images matching your search query. Please try again!',
                    color: '#EF4040',
                    position: 'topRight',
                    messageColor: 'white',
                    messageSize: '5px',
                    timeout: 2000,
                    padding: '20px',
                    gap: '8px',
                    borderRadius: '4px'
                 });
                loading.innerHTML = ``;
                loadBtn.classList.add(`search-btn-hidden`);
                return;
            }
            loading.innerHTML = ``;
      list.insertAdjacentHTML(`beforeend`,createMarkup(data.hits))
            init();
            if (currentPage === 1) {
                loadBtn.classList.remove(`search-btn-hidden`);
              }
              if (currentPage > data.totalHits / perPage) {
                loadBtn.classList.add(`search-btn-hidden`);
                iziToast.show(
                {
                  message: "We're sorry, but you've reached the end of search results."
                }
                );
              }
        })
        .catch(err => console.log(err))
    
}



export async function request(inputValue) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '43859237-c6386bdcccc66f068a9509366'

    const resp = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${currentPage}`)

     return resp.data
 
}



function init() {
    const instance = new SimpleLightbox('.gallery a', {
        captionsDelay: 250,
        captionPosition: "bottom",
    });
    instance.refresh();
}