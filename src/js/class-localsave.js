import debounce from 'debounce';
import { Paginations } from './class-pagination';

export class LocalSave extends Paginations {
  constructor() {
    super();
    this.data = '';
  }
  lokalStart = () => {
    this.start();
    this.EventListenerAll();
    this.paginationStart()
    this.getLanguage();
    this.getThema();
    // this.getCurrentPage();
    this.getInputText()
  
    
    
}
  EventListenerAll = () => {
    // console.log(this.refs.inputFilm);
    // Лісенер лого
    this.refs.logo.addEventListener('click', () => {
      this.goHomePage()
    } )
    // Лісерен хоум
     this.refs.homeBt.addEventListener('click', () => {
      this.goHomePage()
    } )
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
      if (this.searchQuery  === null) {
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
   
    // Лісенер на кліки по кнопці
    this.refs.libraryBt.addEventListener('click', this.onLibraryClick);
    
    this.refs.homeBt.addEventListener('click', this.onHomeClick);
    this.refs.headerWathedBtn.addEventListener('click', this.onWatchedClick);
    this.refs.headerQueueBtn.addEventListener('click', this.onQueueClick);
  };

  onInputSearch = evt => {
    if (!evt.target.value) {
      localStorage.removeItem("search-input-text");
      this.paginationStart();
      return;
    }
    this.searchQuery = evt.target.value;
    this.data = evt.target.value;
    this.setInput()
    this.paginationSearch();

  };
  goHomePage = evt => {
    localStorage.removeItem("search-input-text");
    this.paginationStart();
    this.refs.inputFilm.value = '';
  }


  // Додаємо дані в локалку з інпуту
  setInput = () => {
  
  localStorage.setItem('search-input-text', this.data);
  }
  // Додаємо дані в локалку з мови
  setLanguage = () => {
    localStorage.setItem('language', this.curentLanguage);
  }
  //  Додаємо дані про тему в локалку
  setThema = () => {
   localStorage.setItem('thema', JSON.stringify(this.refs.themaBt.hasAttribute('checked')));
  }

  // Функція получаємо дані з локалки для інпуту
  getInputText = () => {
    const inputText = localStorage.getItem('search-input-text');
    if (inputText) {
      this.refs.inputFilm.value = inputText;
      this.searchQuery = inputText;
      this.paginationSearch()
    }
  }
  // Получаємо дані з локалки для мови
  getLanguage = () => {
    const selectLanguage = localStorage.getItem('language');
    if (selectLanguage) {
      this.curentLanguage = selectLanguage;
      // console.log(this.curentLanguage)
      if (this.curentLanguage === 'en') {
        this.onEnClick() 
      } else {
        this.onUaClick()
      }
    }
  }


  // Получаємо дані з локалки для теми
  getThema = () => {
    const selectThema = localStorage.getItem('thema');
    if (selectThema) {
      // console.log(selectThema)
      if(selectThema === "true")
        this.onThemaClick();
    }
  }

  // дані для сторінки
  getCurrentPage = () => {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
      this.currentPage = JSON.parse(currentPage);
      console.log(this.currentPage)
    }
  };

  //   get x() {
  //     console.log();
  //   }
  //   set x(newWord) {
  //     console.log();
  //   }
}
