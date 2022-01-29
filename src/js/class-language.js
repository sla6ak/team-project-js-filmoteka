import { Render } from './class-render';

export class Language extends Render {
  constructor() {
    super();
  }
  languageStart = () => {
    this.refs.enBox.addEventListener('click', this.onEnClick);
    this.refs.uaBox.addEventListener('click', this.onUaClick);
  };
  onEnClick = event => {
    this.curentLanguage = 'en';
    this.refs.enBox.classList.add('curent-language');
    this.refs.uaBox.classList.remove('curent-language');
    console.log('en');
  };
  onUaClick = () => {
    this.curentLanguage = 'ua';
    this.refs.uaBox.classList.add('curent-language');
    this.refs.enBox.classList.remove('curent-language');
    console.log('ua');
  };
}
