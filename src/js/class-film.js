export class Film {
  constructor() {
    this.film = '';
    this.films = [];
    this.curentLanguage = 'en';
    this.refs = {
      // это объект ссылок к DOM элементам сверстаным статически(не динамически)
      body: document.querySelector('.js-body'),
      // *******************хедер************************
      inputFilm: document.querySelector('#inputname'),
      logo: document.querySelector('.js-logo'),
      homeBt: document.querySelector('.js-home'),
      libraryBt: document.querySelector('.js-library'),
      watchedBt: document.querySelector('.js-watched'),
      queueBt: document.querySelector('.js-queue'),
      blokLibrary: document.querySelector('.js-blok-library'),
      blokSearch: document.querySelector('.js-blok-search'),
      blokBtnHeader: document.querySelector('.js-blok-btnheader'),
      languageBt: document.querySelector('.js-language'),
      enBox: document.querySelector('.js-en'),
      uaBox: document.querySelector('.js-ua'),
      themaBt: document.querySelector('.js-thema'),
      textErrorSearch: document.querySelector('.js-error-search'),
      imgSon: document.querySelector('.js-son'),
      imgMoon: document.querySelector('.js-moon'),
      textThema: document.querySelector('.js-thema'),
      logoLang: document.querySelector('.js-logo-leng'),
      footerTextСopyrightOne: document.querySelector('.footer-text-one'),
      footerTextСopyrightTwo: document.querySelector('.footer-text-two'),
      footerTextСopyrightThree: document.querySelector('.footer-text-block'),
      footerTextСopyrightFour: document.querySelector('.footer__link'),
      
     


      // logo: document.querySelector('.js-logo'),
      // *******************рендер-модалка***********************
      renderBox: document.querySelector('#render'),
      modalWatchedBt: document.querySelector('.js-watched-modal'),
      modalQueueBt: document.querySelector('.js-queue-modal'),
      backdropCardFilm: document.querySelector('#backdropFilmCard'), // модалка з одним фільмом
      aboutApi: document.querySelector('.js-about__api'),
      aboutLang: document.querySelector('.js-about__leng'),
      containerPagination: document.querySelector('#tui-pagination-container'), // контейнер для пагинации
      prewiuModalka: document.querySelector('.js-prewiu-img'),
      backdropVideo: document.querySelector('.modal-youtube'),
      modalVideo: document.querySelector('.modal-youtube__box'),
      // prew: document.querySelector('.js-prewiu-img'),
      // logo: document.querySelector('.js-logo'),
      // logo: document.querySelector('.js-logo'),
      // logo: document.querySelector('.js-logo'),
      // logo: document.querySelector('.js-logo'),
      // *******************подвал и модалка с командой************
      ourTeam: document.querySelector('.js-our-team'),
      // logo: document.querySelector('.js-logo'),
      // logo: document.querySelector('.js-logo'),
    };
  }
  // проверочный метод который я запустил в самом индексе сквозь все классы чтоб убедиться что все настроено
  start() {
    console.log('start film!');
  }
  getRefs = () => {
    return this.refs;
  };
}
