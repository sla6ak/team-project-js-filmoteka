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
    this.EventListenerAll(); //стартуем объязательные слушатели
    this.getLocalThema(); //проверим сохраненную тему
    this.getLocalLanguage(); //проверяем на каком языке была вкладка
    this.getLocalInputText(); //проверим искал ли он кино или нет
    this.getLibraryTrue(); //проверяем был ли пользователь в библиотеке или на стартовой странице
    this.getArreyWatched(); //провеерим какие фильмы сохранены в просмотреных
    this.getArreyQueue(); //проверим какие фильмы сохранены в отложеных
    this.getLocalCurrentPage(); //проверяем страницу на которой находился пользователь
    if (this.libraryTrue) {
      //наконец стартуем
      this.paginationLibrarySave(this.libraryTrueBt); //проверяем в какой кнопке мы
    } else {
      this.paginationStart(this.searchQuery);
    }
  };
  // *******************слушатели событий********************************************
  EventListenerAll = () => {
    // Лісенер лого
    this.refs.logo.addEventListener('click', () => {
      this.onWatchedClick(); //это заглушка перекидывающая пользователя всегда в просмотренные так как стартовая функция рендерит просмотренные
      this.setLibraryTrue(false);
      this.goHomePage();
      this.onHomeClick();
    });
    // Лісерен хоум
    this.refs.homeBt.addEventListener('click', () => {
      this.onWatchedClick(); //это заглушка перекидывающая пользователя всегда в просмотренные так как стартовая функция рендерит просмотренные
      this.setLibraryTrue(false);
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
      this.paginationStart(this.searchQuery); // если пользователь сменил язык и у него сохранено поисковое слово значит передаем тру а иначе популярные фильмы найдет
    });

    this.refs.uaBox.addEventListener('click', () => {
      this.onUaClick();
      this.setLocalLanguage();

      if (this.refs.libraryBt.className == 'button-nav js-library button-nav--current') {
        return;
      }
      this.paginationStart(this.searchQuery); // если пользователь сменил язык и у него сохранено поисковое слово значит передаем тру а иначе популярные фильмы найдет
    });
    // Лісенер на кліки по вибору теми
    this.refs.themaBt.addEventListener('click', () => {
      this.onThemaClick();
      this.setLocalThema();
    });
    // Лісенер на кліки по кнопці бібліотека
    this.refs.libraryBt.addEventListener('click', () => {
      this.currentPage = 1;
      this.onWatchedClick(); // чтобы возвращало на стартовую вкладку Watched
      this.setLibraryTrue(true);
      // зразу записую тру для кнопки переглянуті
      this.setHeaderWatchedBtnTrue(true);
      this.onLibraryClick();
      this.paginationLibrarySave(true); //true для просмотреных фильмов
    });
    // Лісенер по кліку на модалку кнопка переглянуті
    this.refs.modalWatchedBt.addEventListener('click', () => {
      if (this.arrWatched.includes(this.liID)) {
        this.arrWatched.splice(this.arrWatched.indexOf(this.liID), 1);
        // це треба додавати тільки якщо ми відкрили модалку
        // коли знаходимось у бібліотеці(виправить баг зі зниканням карточок)
        // +++++
        if (localStorage.getItem('is-library') !== 'false') {
          this.paginationLibrarySave(true);
        }
      } else {
        this.arrWatched.push(this.liID);
        if (localStorage.getItem('is-library') !== 'false') {
          this.paginationLibrarySave(true);
        }
      }
      this.setFilmWached();
      this.isFilmsSave();
    });
    // Лісенер по кліку на модалку кнопка черга
    this.refs.modalQueueBt.addEventListener('click', () => {
      if (this.arrQueue.includes(this.liID)) {
        this.arrQueue.splice(this.arrQueue.indexOf(this.liID), 1);
        // це треба додавати тільки якщо ми відкрили библиотеку
        if (this.libraryTrue) {
          this.paginationLibrarySave(false);
        }
      } else {
        this.arrQueue.push(this.liID);
        if (this.libraryTrue) {
          this.paginationLibrarySave(false);
        }
      }
      this.setFilmQueue();
      this.isFilmsSave();
    });

    this.openModalFooter();
    // слушатель для кнопок библиотеки в хедере
    this.refs.headerWathedBtn.addEventListener('click', () => {
      this.currentPage = 1;
      this.onWatchedClick();
      this.paginationLibrarySave(true); //true для просмотреных фильмов
      this.setHeaderWatchedBtnTrue(true);
    });
    this.refs.headerQueueBtn.addEventListener('click', () => {
      this.currentPage = 1;
      this.onQueueClick();
      this.paginationLibrarySave(false); //false для НЕ просмотреных фильмов
      this.setHeaderWatchedBtnTrue(false);
    });
  };

  onInputSearch = evt => {
    this.currentPage = 1;
    this.setCurrentPage();
    if (!evt.target.value.trim()) {
      localStorage.removeItem('search-input-text');
      this.paginationStart(evt.target.value.trim().toLowerCase()); //от того есть ли поисковое слово будет тру либо фолс и метод поймет какой запрос нужен
      return;
    }
    this.searchQuery = evt.target.value.trim().toLowerCase();
    this.data = evt.target.value.trim().toLowerCase();
    this.setLocalInput();
    this.paginationStart(evt.target.value.trim().toLowerCase()); //от того есть ли поисковое слово будет тру либо фолс и метод поймет какой запрос нужен
  };

  goHomePage = evt => {
    this.currentPage = 1;
    localStorage.removeItem('search-input-text');
    localStorage.removeItem('currentPage');
    this.refs.inputFilm.value = '';
    this.currentPage = 1;
    this.paginationStart(false);
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
  // Записую в локалку дані про фільм перглянуті
  setFilmWached = () => {
    localStorage.setItem('wached-film', JSON.stringify(this.arrWatched));
  };
  // Записую в локалку дані про фільм додані в чергу
  setFilmQueue = () => {
    localStorage.setItem('queue-film', JSON.stringify(this.arrQueue));
  };
  // мутод записывает где находиться пользователь. тру либо фолс - library
  setLibraryTrue = argument => {
    localStorage.setItem('is-library', JSON.stringify(argument));
    this.libraryTrue = argument;
  };
  setHeaderWatchedBtnTrue = argument => {
    this.libraryTrueBt = argument;
    localStorage.setItem('is-watched-btn', JSON.stringify(argument));
  };

  // *******************чтение локалки*********************************************
  getHeaderBtnTrue = () => {
    const WatchedBtnTrue = localStorage.getItem('is-watched-btn'); //проверим на какой кнопке был пользователь
    if (WatchedBtnTrue) {
      this.libraryTrueBt = JSON.parse(WatchedBtnTrue); // тру или фолс
      if (this.libraryTrueBt) {
        console.log('пагінація переглянуті');
        this.onWatchedClick();
        // ТУТ НЕ ЗНАЮ яку функцію додати щоб рендорилась та сама сторінка що і при кліку на кнопку
        // this.paginationLibrarySave(true);
      } else {
        console.log('пагінація додати до перегляду');
        // this.currentPage = 1;
        this.onQueueClick();
        // ТУТ НЕ ЗНАЮ яку функцію додати щоб рендорилась та сама сторінка що і при кліку на кнопку
        // this.paginationLibrarySave(false);
      }
    }
  };

  getArreyWatched = () => {
    const arreyWatched = localStorage.getItem('wached-film');
    if (arreyWatched) {
      this.arrWatched = JSON.parse(arreyWatched);
    }
  };
  getArreyQueue = () => {
    const arreyQueue = localStorage.getItem('queue-film');
    if (arreyQueue) {
      this.arrQueue = JSON.parse(arreyQueue);
    }
  };

  getLibraryTrue = () => {
    const libraryIsTrue = localStorage.getItem('is-library'); // проверим были ли мы в библиотеке
    if (libraryIsTrue) {
      this.libraryTrue = JSON.parse(libraryIsTrue);
      if (this.libraryTrue) {
        // тру или фалс
        this.getHeaderBtnTrue();
        this.onLibraryClick();
      }
    }
  };
  // Функція получаємо дані з локалки для інпуту
  getLocalInputText = () => {
    const inputText = localStorage.getItem('search-input-text');
    if (inputText) {
      this.refs.inputFilm.value = inputText;
      this.searchQuery = inputText;
      this.paginationStart(inputText);
    }
  };
  // Получаємо дані з локалки для мови
  getLocalLanguage = () => {
    const selectLanguage = localStorage.getItem('language');
    if (selectLanguage) {
      this.curentLanguage = selectLanguage;
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
      if (selectThema === 'true') this.onThemaClick();
    }
  };

  // дані для сторінки
  getLocalCurrentPage = () => {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
      this.currentPage = JSON.parse(currentPage);
    }
  };
}
