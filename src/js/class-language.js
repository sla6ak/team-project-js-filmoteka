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
    this.curentLanguale = 'en';
    this.refs.enBox.classList.add('curent-language');
    this.refs.uaBox.classList.remove('curent-language');
    console.log('en');
  };
  onUaClick = () => {
    this.curentLanguale = 'ua';
    this.refs.uaBox.classList.add('curent-language');
    this.refs.enBox.classList.remove('curent-language');
    console.log('ua');
  };
}
