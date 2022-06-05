import axios from "axios";
import { Notify } from "notiflix";
const btnMore = document.querySelector('.load-more');
export default class NewGalery {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    async fetchPhotos() {
        return await axios({
            method: 'GET',
            url: `https://pixabay.com/api/?key=27859965-17b92fa88b33871dcb6f37147&q=${this.searchQuery}
                &image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
        }).then(response => {
            console.log(response.data.hits);
            if (response.data.hits.length === 0) { 
                btnMore.classList.add('is-hidden');
                return;
            };
            btnMore.classList.remove('is-hidden')
            if (response.data.hits.length < 40) {
                btnMore.classList.add('is-hidden');
                Notify.info("We're sorry, but you've reached the end of search results.");
            };
            return response.data.hits;
        })
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };

    resetPage() {
        this.page = 1;
    };

    increasePage() {
        this.page += 1;
    };

}