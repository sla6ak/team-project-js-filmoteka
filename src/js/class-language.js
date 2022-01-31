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
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
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
    this.refs.homeBt.innerHTML = 'ДОМIВКА';
    this.refs.libraryBt.innerHTML = 'МОЯ КНИГАРНЯ';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
    // this.refs.logoLang.innerHTML = 'Фiльмотека';
  };
}
