import { Film } from './class-film';

export class Fetch extends Film {
  constructor() {
    super();
    this.BASE_URL = 'https://api.themoviedb.org/3/';
    this.API_KEY = '69130d0521ed03b58ebb84abea94c8b9'

    this.searchQuery = '';
    this.page = 1;
    this.language = this.curentLanguage;
    this.adult = false;
  }

  //films for first page
  async fetchPopularFilms() {
    try {
  const results = await fetch(`${this.BASE_URL}trending/movie/week?api_key=${this.API_KEY}`);
  const data = await results.json();
      return data;
    }
    catch (error) {
      alert("Sorry, something went wrong")
    }
  };


  //films search by name
  async fetchSearchFilms (page1) {
    const parametrs = {
      api_key: this.api_key,
      page: page1,
      language: this.language,
      query: this.searchQuery,
      include_adult: this.adult,
    };
    const meta = new URLSearchParams(parametrs);
    try {
      const results = await fetch(`${ this.BASE_URL}/movie?${meta}`);
      const data = await results.json();
      localStorage.setItem('totalPages', data.total_results);

      console.log(data);
      return data.results;
    }
    catch (error) {
       alert("Sorry, something went wrong")
    }
  };


//Info about film and video
  async fetchFilmsInfo (id) {
    try {
      const result = await fetch(`${ this.URL }/movie/${id}?${this.API_KEY}&append_to_response=videos`);
      const data = await result.json();

      console.log(data);
      return data.results;
    } catch (error) {
       alert("Sorry, something went wrong")
    }
  };
}