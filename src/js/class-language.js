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
    this.refs.logoLang.innerHTML = 'Filmoteka';
    this.refs.homeBt.innerHTML = 'HOME';
    this.refs.libraryBt.innerHTML = 'MY LIBRARY';
    this.refs.footerTextСopyrightOne.innerHTML = 'All Rights Reserved';
    this.refs.footerTextСopyrightTwo.innerHTML = 'Developed with';
    this.refs.footerTextСopyrightThree.classList.add('footer-text-block');
    this.refs.footerTextСopyrightThree.classList.remove('footer-text-none');
    this.refs.footerTextСopyrightFour.innerHTML = 'GoIT Students';
    this.refs.voteTitle.textContent = 'Vote / Votes';
    this.refs.popularityTitle.textContent = 'Popularity';
    this.refs.originalTitle.textContent = 'Originat Title';
    this.refs.genreTitle.textContent = 'Genre';
    this.refs.aboutTitle.textContent = 'ABOUT';
    this.refs.inputFilm.placeholder = 'Search film';
    this.refs.notificationText.innerHTML = 'Search result failed. Enter the correct movie title and';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
  };
  onUaClick = () => {
    this.curentLanguage = 'uk';
    this.refs.uaBox.classList.add('curent-language');
    this.refs.enBox.classList.remove('curent-language');
    console.log('ua');
    this.refs.logoLang.innerHTML = 'Фiльмотека';
    this.refs.homeBt.innerHTML = 'ГОЛОВНА';
    this.refs.libraryBt.innerHTML = 'МОЯ БІБЛІОТЕКА';
    this.refs.footerTextСopyrightOne.innerHTML = 'Усі права захищено';
    this.refs.footerTextСopyrightTwo.innerHTML = 'Розроблено з';
    this.refs.footerTextСopyrightThree.classList.add('footer-text-none');
    this.refs.footerTextСopyrightThree.classList.remove('footer-text-block');
    this.refs.footerTextСopyrightFour.innerHTML = 'Cтудентами GoIT ';
    this.refs.voteTitle.textContent = 'Рейтинг / Голосів';
    this.refs.popularityTitle.textContent = 'Популярність';
    this.refs.originalTitle.textContent = 'Оригінальна Назва';
    this.refs.genreTitle.textContent = 'Жанр';
    this.refs.aboutTitle.textContent = 'ОПИС';
    this.refs.inputFilm.placeholder = 'Пошук фільму';
    this.refs.notificationText.innerHTML = 'Помилка результату пошуку. Введіть правильну назву фільму';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
  };
}
