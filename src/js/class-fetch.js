import { Film } from './class-film';

export class Fetch extends Film {
  constructor() {
    super();
    this.BASE_URL = 'https://api.themoviedb.org/3/';
    this.API_KEY = '69130d0521ed03b58ebb84abea94c8b9'

    this.searchQuery = '';
    this.page = 1;
    this.language = 'en-US';
  }

  // функция для популярных фильмов

     fetchPopularFilms() {
    const url = `${this.BASE_URL}movie/popular?api_key=${this.API_KEY}&language=${this.language}&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(results => {
        this.incrementPage();
        return results;
      })
     }
  
  // функция для получения жанров 

  async FetchGenresFilms() {
    const url = `${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}&language=en-US&page=${this.page}`;
    try {
      const response = await response.json();
      const result = await response;
      return result;
    } catch(error) {
      error;
      }
  };
  
    //  функция для поиска фильмов
  
  async fetchSearchFilms() {
    try {
      const response = await fetch(
        `${this.BASE_URL}movie/search/movie?api_key=${this.API_KEY}&language=${this.language}&page=${this.page}&include_adult=false&query=${this.searchQuery}`,
    );
      
    const data = await response.json();
    const result = await data
    return result;
  } catch(error) {
      error;
      }
  }

  //  функция. Трейлер к фильму 

   async fetchTrailer(id) {
    try {
      const response = await fetch(`${this.BASE_URL}movie/${id}/videos?api_key=${this.API_KEY}&language=${this.language}`);
      const data = await response.json();
      const results = await data
      return results;
    } catch (error) {
      error
    }
   }
  
   incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
  
   get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

};