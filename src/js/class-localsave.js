import debounce from 'debounce';
import { Paginations } from './class-pagination';

export class LocalSave extends Paginations {
  constructor() {
    super();
  }

  EventListenerForInput = () => {
    // console.log(this.refs.inputFilm);

    this.refs.inputFilm.addEventListener('input', debounce(this.onInputSearch, 1000));
  };

  onInputSearch = evt => {
    this.searchQuery = evt.target.value;

    this.paginationSearch();

    console.log(evt.target.value);
  };

  // setCurrentPage = () => {
  //   localStorage.setItem('currentPage', this.currentPage);
  // };

  // getCurrentPage = () => {
  //   const curPage = localStorage.getItem('currentPage');
  //   return JSON.parse(curPage);
  // };

  //   get x() {
  //     console.log();
  //   }
  //   set x(newWord) {
  //     console.log();
  //   }
}
