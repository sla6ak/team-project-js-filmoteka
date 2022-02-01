import debounce from 'debounce';
import { Paginations } from './class-pagination';

export class LocalSave extends Paginations {
  constructor() {
    super();
  }

  EventListenerAll = () => {
    // console.log(this.refs.inputFilm);
    // Лісенер на інпут
    this.refs.inputFilm.addEventListener('input', debounce(this.onInputSearch, 1000));
    // Лісенер на клік по мови
    this.refs.enBox.addEventListener('click', () => {
      this.onEnClick();
      this.setLanguage();
      if (this.searchQuery === null) {
        this.paginationStart();
      } else {
        this.paginationSearch();
      }
    });

    this.refs.uaBox.addEventListener('click', () => {
      this.onUaClick();
      this.setLanguage();
      if (this.searchQuery === null) {
        this.paginationStart();
      } else {
        this.paginationSearch();
      }
    });
    // Лісенер на кліки по вибору теми
    this.refs.themaBt.addEventListener('click', () => {
      this.onThemaClick();
      this.setThema();
    });
    // Лісенер на кліки по вибору сторінки
    this.refs.containerPagination.addEventListener('click', () => {
      this.paginationStart();
      console.log(this.currentPage);
      this.setCurrentPage();
    })
    // Лісенер на кліки по кнопці
    this.refs.libraryBt.addEventListener('click', this.onLibraryClick);
    
    this.refs.homeBt.addEventListener('click', this.onHomeClick);
  };

  onInputSearch = evt => {
    if (!evt.target.value) {
      return;
    }
    this.searchQuery = evt.target.value;
    this.setInput()
    this.paginationSearch();

  };

  
  // Додаємо дані в локалку з інпуту
  setInput = ()=> {
  localStorage.setItem('search-input-text', this.searchQuery);
  }
  // Додаємо дані в локалку з мови
  setLanguage = () => {
    localStorage.setItem('language', this.curentLanguage);
  }
  //  Додаємо дані про тему в локалку
  setThema = () => {
   localStorage.setItem('thema', JSON.stringify(true));
  }
  // Додаємо дані про вибрану сторінку
  setCurrentPage = () => {
    localStorage.setItem('currentPage', JSON.stringify(this.currentPage));
  };

  // Функція получаємо дані з локалки для інпуту
  getInputText = () => {
    const inputText = localStorage.getItem('search-input-text');
    if (inputText) {
      return inputText;
    }
  }
  // Получаємо дані з локалки для мови
  getLanguage = () => {
    const selectLanguage = localStorage.getItem('language');
    if (selectLanguage) {
      return selectLanguage;
    }
  }
  // Получаємо дані з локалки для теми
  getThema = () => {
    const selectThema = localStorage.getItem('thema');
     if (selectThema) {
       this.onThemaClick();
    }
  }
  // дані для сторінки
  getCurrentPage = () => {
    const currentPage = localStorage.getItem('currentPage');
    return JSON.parse(currentPage);
  };

  //   get x() {
  //     console.log();
  //   }
  //   set x(newWord) {
  //     console.log();
  //   }
}
