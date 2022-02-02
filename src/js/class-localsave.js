import debounce from 'debounce';
import { Paginations } from './class-pagination';

export class LocalSave extends Paginations {
  constructor() {
    super();
  }

  EventListenerAll = () => {
    // console.log(this.refs.inputFilm);
    this.refs.inputFilm.addEventListener('input', debounce(this.onInputSearch, 1000));
    this.refs.enBox.addEventListener('click', () => {
      this.onEnClick();
      if (this.searchQuery === null) {
        this.paginationStart();
      } else {
        this.paginationSearch();
      }
    });
    this.refs.uaBox.addEventListener('click', () => {
      this.onUaClick();
      if (this.searchQuery === null) {
        this.paginationStart();
      } else {
        this.paginationSearch();
      }
    });
    this.refs.libraryBt.addEventListener('click', this.onLibraryClick);
    this.refs.homeBt.addEventListener('click', this.onHomeClick);
    this.refs.headerWathedBtn.addEventListener('click', this.onWatchedClick);
    this.refs.headerQueueBtn.addEventListener('click', this.onQueueClick);

    this.openModalFooter()
    
  };

  onInputSearch = evt => {
    if (evt.target.value == false) {
      return;
    }
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
