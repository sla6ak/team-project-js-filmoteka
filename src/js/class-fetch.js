import { Film } from './class-film';

export class Fetch extends Film {
  constructor() {
    super();
    this.BASE_URL = 'https://api.themoviedb.org/3/';
    this.API_KEY = '69130d0521ed03b58ebb84abea94c8b9'

    this.searchQuery = '';
    this.adult = false;
  }

  //films for first page
  async fetchPopularFilms(currentPage) {
    const parametrs = {
      api_key: this.API_KEY,
      page: currentPage,
      language: this.curentLanguage,
      include_adult: this.adult,
    };
    const meta = new URLSearchParams(parametrs);
    try {
  const results = await fetch(`${this.BASE_URL}trending/movie/week?${meta}`);
      const data = await results.json();
      return data.results;
    }
    catch (error) {
      alert("Sorry, something went wrong")
    }
  };

  // get genres list
async fetchGenresList() {
    const parametrs = {
      api_key: this.API_KEY,
      language: this.curentLanguage,
    };
    const meta = new URLSearchParams(parametrs);
    try {
      const results = await fetch(`${ this.BASE_URL}/genre/movie/list?${meta}`);
      const data = await results.json();
      return data.genres;
    }
    catch (error) {
       alert("Sorry, something went wrong")
    }
  };

  //films search by name
  async fetchSearchFilms (currentPage) {
    const parametrs = {
      api_key: this.API_KEY,
      page: currentPage,
      language: this.curentLanguage,
      query: this.searchQuery,
      include_adult: this.adult,
    };
    const meta = new URLSearchParams(parametrs);
    try {
      const results = await fetch(`${ this.BASE_URL}/movie?${meta}`);
      const data = await results.json();
      localStorage.setItem('totalPages', data.total_results);

      return data.results;
    }
    catch (error) {
       alert("Sorry, something went wrong")
    }
  };


//Info about film and video
  async fetchFilmsInfo(id) {
    const parametrs = {
      api_key: this.API_KEY,
      language: this.curentLanguage,
    };
    const meta = new URLSearchParams(parametrs);
    try {
      const result = await fetch(`${ this.BASE_URL }/movie/${id}?${meta}&append_to_response=videos`);
      const data = await result.json();
      return data;
    }
    catch (error) {
       alert("Sorry, something went wrong")
    }
  };
}