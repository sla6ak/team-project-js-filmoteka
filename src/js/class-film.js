export class Film {
  constructor() {
    this.film = '';
    this.films = [];
    this.refs = {
      // это объект ссылок к DOM элементам сверстаным статически(не динамически)
      renderBox: document.querySelector('#render'),
      inputFilm: document.querySelector('#inputname'),
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
