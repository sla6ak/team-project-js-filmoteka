import { Language } from './class-language';

export class Thema extends Language {
  constructor() {
    super();
  }
  
  themaStart = () => {
    this.refs.themaBt.addEventListener('click', this.onThemaClick);
  };

  onThemaClick = () => {
    this.refs.body.classList.toggle('moon-time');
    this.refs.imgSon.classList.toggle('curent-time');
    this.refs.imgMoon.classList.toggle('curent-time');
    console.log('день-ночь');
  };
}
