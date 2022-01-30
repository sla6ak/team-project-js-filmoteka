import { Film } from './class-film';

export class Fetch extends Film {
  constructor() {
    super();
    this.BASE_URL = 'https://api.themoviedb.org/3/';
    this.API_KEY = 'c4ff5df06d9c3bc212d0ff99e5222626';
    this.currentPage = 1;
    this.searchQuery = 'man';
    this.adult = false;
    this.totalPages = 1;
  }

  //films for first page
  async fetchPopularFilms() {
    const parametrs = {
      api_key: this.API_KEY,
      page: this.currentPage,
      language: this.curentLanguage,
      include_adult: this.adult,
    };
    const meta = new URLSearchParams(parametrs);
    try {
      const results = await fetch(`${this.BASE_URL}trending/movie/week?${meta}`);
      const data = await results.json();
      return data.results;
    } catch (error) {
      alert('Sorry, something went wrong');
    }
  }

  // get genres list
  async fetchGenresList() {
    const parametrs = {
      api_key: this.API_KEY,
      language: this.curentLanguage,
    };

    const meta = new URLSearchParams(parametrs);
    try {
      const results = await fetch(`${this.BASE_URL}genre/movie/list?${meta}`);
      const data = await results.json();
      return data.genres;
    } catch (error) {
      alert('Sorry, something went wrong');
    }
  }

  //films search by name
  async fetchSearchFilms() {
    const parametrs = {
      api_key: this.API_KEY,
      page: this.currentPage,
      language: this.curentLanguage,
      query: this.searchQuery,
      include_adult: this.adult,
    };
    const meta = new URLSearchParams(parametrs);
    try {
      const results = await fetch(`${this.BASE_URL}search/movie?${meta}`);
      const data = await results.json();
      this.totalPages = data.total_results;

      return data.results;
    } catch (error) {
      alert('Sorry, something went wrong');
    }
  }

  //Info about film and video
  async fetchFilmsInfo(id) {
    const parametrs = {
      api_key: this.API_KEY,
      language: this.curentLanguage,
    };
    const meta = new URLSearchParams(parametrs);
    try {
      const result = await fetch(`${this.BASE_URL}/movie/${id}?${meta}&append_to_response=videos`);
      const data = await result.json();
      return data;
    } catch (error) {
      alert('Sorry, something went wrong');
    }
  }
  getTotalPages = () => {
    return this.totalPages;
  };
}