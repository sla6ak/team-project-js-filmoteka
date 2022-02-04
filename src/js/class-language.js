import { Render } from './class-render';

export class Language extends Render {
  constructor() {
    super();
  }
  onEnClick = () => {
    this.curentLanguage = 'en';
    this.refs.enBox.classList.add('curent-language');
    this.refs.uaBox.classList.remove('curent-language');
    console.log('en');
    this.refs.logoLang.textContent = 'Filmoteka';
    this.refs.homeBt.textContent = 'HOME';
    this.refs.libraryBt.textContent = 'MY LIBRARY';
    this.refs.footerTextСopyrightOne.textContent = 'All Rights Reserved';
    this.refs.footerTextСopyrightTwo.textContent = 'Developed with';
    this.refs.footerTextСopyrightThree.classList.add('footer-text-block');
    this.refs.footerTextСopyrightThree.classList.remove('footer-text-none');
    this.refs.footerTextСopyrightFour.textContent = 'GoIT Students';
    this.refs.voteTitle.textContent = 'Vote / Votes';
    this.refs.popularityTitle.textContent = 'Popularity';
    this.refs.originalTitle.textContent = 'Originat Title';
    this.refs.genreTitle.textContent = 'Genre';
    this.refs.aboutTitle.textContent = 'ABOUT';
    this.refs.inputFilm.placeholder = 'Search film';
    this.refs.notificationText.textContent =
      'Search result failed. Enter the correct movie title and';
    this.refs.headerWathedBtn.textContent = 'watched';
    this.refs.headerQueueBtn.textContent = 'queue';
    // this.refs.otherTitle.textContent = ', Other';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
  };
  onUaClick = () => {
    this.curentLanguage = 'uk';
    this.refs.uaBox.classList.add('curent-language');
    this.refs.enBox.classList.remove('curent-language');
    console.log('ua');
    this.refs.logoLang.textContent = 'Фiльмотека';
    this.refs.homeBt.textContent = 'ГОЛОВНА';
    this.refs.libraryBt.textContent = 'МОЯ БІБЛІОТЕКА';
    this.refs.footerTextСopyrightOne.textContent = 'Усі права захищено';
    this.refs.footerTextСopyrightTwo.textContent = 'Розроблено з';
    this.refs.footerTextСopyrightThree.classList.add('footer-text-none');
    this.refs.footerTextСopyrightThree.classList.remove('footer-text-block');
    this.refs.footerTextСopyrightFour.textContent = 'Cтудентами GoIT ';
    this.refs.voteTitle.textContent = 'Рейтинг / Голосів';
    this.refs.popularityTitle.textContent = 'Популярність';
    this.refs.originalTitle.textContent = 'Оригінальна Назва';
    this.refs.genreTitle.textContent = 'Жанр';
    this.refs.aboutTitle.textContent = 'ОПИС';
    this.refs.inputFilm.placeholder = 'Пошук фільму';
    this.refs.notificationText.textContent =
      'Помилка результату пошуку. Введіть правильну назву фільму';
    this.refs.headerWathedBtn.textContent = 'Історія перегляду';
    this.refs.headerQueueBtn.textContent = 'на майбутне';
    // this.refs.otherTitle.textContent = ', Інші';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
  };
}
