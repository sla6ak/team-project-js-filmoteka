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
      languageBt: document.querySelector('.js-language'),
      enBox: document.querySelector('.js-en'),
      uaBox: document.querySelector('.js-ua'),
      themaBt: document.querySelector('.js-thema'),
      textErrorSearch: document.querySelector('.js-error-search'),
      imgSon: document.querySelector('.js-son'),
      imgMoon: document.querySelector('.js-moon'),
      textThema: document.querySelector('.js-thema'),
      // logo: document.querySelector('.js-logo'),
      // logo: document.querySelector('.js-logo'),
      // logo: document.querySelector('.js-logo'),
      // *******************рендер-модалка***********************
      renderBox: document.querySelector('#render'),
      modalWatchedBt: document.querySelector('.js-watched-modal'),
      modalQueueBt: document.querySelector('.js-queue-modal'),
      // logo: document.querySelector('.js-logo'),
      // logo: document.querySelector('.js-logo'),
      // logo: document.querySelector('.js-logo'),
      containerPagination: document.getElementById('tui-pagination-container'), // контейнер для пагинации
      // *******************подвал и модалка с командой************
      ourTeam: document.querySelector('.js-our-team'),
      // logo: document.querySelector('.js-logo'),
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
