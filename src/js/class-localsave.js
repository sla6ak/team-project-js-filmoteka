import debounce from 'debounce';
import { Paginations } from './class-pagination';

export class LocalSave extends Paginations {
  constructor() {
    super();
    this.data = '';
  }
  // ***************стартует всю логику *******************************************
  lokalStart = () => {
    this.start();
    this.EventListenerAll();
    this.getLocalCurrentPage();
    this.getLocalLanguage();
    this.getLocalThema();
    this.getLocalInputText();
    this.paginationStart();
  };
  // *******************слушатели событий********************************************
  EventListenerAll = () => {
    // console.log(this.refs.inputFilm);
    // Лісенер лого
    this.refs.logo.addEventListener('click', () => {
      this.goHomePage();
      this.onHomeClick();
    });
    // Лісерен хоум
    this.refs.homeBt.addEventListener('click', () => {
      this.goHomePage();
      this.onHomeClick();
    });
    // Лісенер на інпут
    this.refs.inputFilm.addEventListener('input', debounce(this.onInputSearch, 1000));
    // Лісенер на клік по мови
    this.refs.enBox.addEventListener('click', () => {
      this.onEnClick();
      this.setLocalLanguage();

      if (this.refs.libraryBt.className == 'button-nav js-library button-nav--current') {
        return;
      }

      if (this.searchQuery === null) {
        this.paginationStart();
      } else {
        this.paginationSearch();
      }
    });

    this.refs.uaBox.addEventListener('click', () => {
      this.onUaClick();
      this.setLocalLanguage();

      if (this.refs.libraryBt.className == 'button-nav js-library button-nav--current') {
        return;
      }
      if (this.searchQuery === null) {
        this.paginationStart();
      } else {
        this.paginationSearch();
      }
    });
    // Лісенер на кліки по вибору теми
    this.refs.themaBt.addEventListener('click', () => {
      this.onThemaClick();
      this.setLocalThema();
    });

    // Лісенер на кліки по кнопці
    this.refs.libraryBt.addEventListener('click', () => {
      this.onLibraryClick();
      this.paginationWatched();
    });
    this.refs.homeBt.addEventListener('click', this.onHomeClick);
    this.refs.headerWathedBtn.addEventListener('click', () => {
      this.onWatchedClick();
      this.paginationWatched();
    });
    this.refs.headerQueueBtn.addEventListener('click', () => {
      this.onQueueClick();
      this.paginationQueue();
    });
  };

  onInputSearch = evt => {
    this.currentPage = 1;
    this.setCurrentPage();
    if (!evt.target.value.trim()) {
      localStorage.removeItem('search-input-text');
      this.paginationSearch();
      return;
    }
    this.searchQuery = evt.target.value.trim();
    this.data = evt.target.value.trim();
    this.setLocalInput();
    this.paginationSearch();
  };

  goHomePage = evt => {
    this.currentPage = 1;
    localStorage.removeItem('search-input-text');
    this.paginationStart();
    this.refs.inputFilm.value = '';
  };
  // *********************запись данных в локалку********************************
  // Додаємо дані в локалку з інпуту
  setLocalInput = () => {
    localStorage.setItem('search-input-text', this.data);
  };
  // Додаємо дані в локалку з мови
  setLocalLanguage = () => {
    localStorage.setItem('language', this.curentLanguage);
  };
  //  Додаємо дані про тему в локалку
  setLocalThema = () => {
    localStorage.setItem('thema', JSON.stringify(this.refs.themaBt.hasAttribute('checked')));
  };
  // *******************чтение локалки*********************************************
  // Функція получаємо дані з локалки для інпуту
  getLocalInputText = () => {
    const inputText = localStorage.getItem('search-input-text');
    if (inputText) {
      this.refs.inputFilm.value = inputText;
      this.searchQuery = inputText;
      this.paginationSearch();
    }
  };
  // Получаємо дані з локалки для мови
  getLocalLanguage = () => {
    const selectLanguage = localStorage.getItem('language');
    if (selectLanguage) {
      this.curentLanguage = selectLanguage;
      // console.log(this.curentLanguage)
      if (this.curentLanguage === 'en') {
        this.onEnClick();
      } else {
        this.onUaClick();
      }
    }
  };

  // Получаємо дані з локалки для теми
  getLocalThema = () => {
    const selectThema = localStorage.getItem('thema');
    if (selectThema) {
      // console.log(selectThema)
      if (selectThema === 'true') this.onThemaClick();
    }
  };

  // дані для сторінки
  getLocalCurrentPage = () => {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
      this.currentPage = JSON.parse(currentPage);
      // console.log(this.currentPage);
    }
  };
}

// заметка в классе фильм добавленно два пустых массива
// куда надо записывать фильмы из локалки оттуда их будут читать классы сверху
