import axios from "axios";
import NewGalery from "../js/new-galery";
import {Notify} from "notiflix";
const refs = {
  form: document.querySelector('#search-form'),
  galeryWrap: document.querySelector('.gallery'),
  btnMore: document.querySelector('.load-more')
}
console.log(refs.form.elements);
const newGalery = new NewGalery();
console.log("Done");
refs.form.addEventListener('submit', onSearch);
refs.btnMore.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();

  if (!refs.btnMore.classList.contains('is-hidden')) {
    refs.btnMore.classList.add('is-hidden');
  }
  clearMarkup();
  newGalery.query = refs.form.elements.searchQuery.value;
  newGalery.resetPage();
  newGalery.fetchPhotos()
    .then(markupGalery)
    .catch(error => {
      Notify.info("Sorry, there are no images matching your search query.Please try again.")
      return;
    });
};

async function onLoadMore(evt) {
  evt.preventDefault();

  refs.btnMore.classList.add('is-hidden');
  newGalery.increasePage();
  newGalery.fetchPhotos().then(markupGalery);
  console.log("Done");
}

function markupGalery(photos) {
    const photosMarkup = photos.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b> ${likes}
                    </p>
                    <p class="info-item">
                      <b>Views</b> ${views}
                    </p>
                    <p class="info-item">
                      <b>Comments</b> ${comments}
                    </p>
                    <p class="info-item">
                      <b>Downloads</b> ${downloads}
                    </p>
                  </div>
                </div>`
    }).join("");
  refs.galeryWrap.insertAdjacentHTML("beforeend", photosMarkup);
}

function clearMarkup() {
  refs.galeryWrap.innerHTML = "";
}