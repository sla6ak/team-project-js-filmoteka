import { Language } from './class-language';

export class Thema extends Language {
  constructor() {
    super();
  }

  themaStart = () => {
    this.refs.themaBt.addEventListener('click', this.onThemaClick);
  };

  onThemaClick = () => {
    if (!this.refs.themaBt.hasAttribute('checked')) {
      this.refs.themaBt.setAttribute('checked', 'checked');
    } else {
      this.refs.themaBt.removeAttribute('checked');
    }
    this.refs.body.classList.toggle('moon-time');
    this.refs.imgSon.classList.toggle('curent-time');
    this.refs.imgMoon.classList.toggle('curent-time');
    this.refs.renderBox.classList.toggle('render-box--dark');
    this.refs.footer.classList.toggle('footer--dark');

    console.log('день-ночь');
  };
}
