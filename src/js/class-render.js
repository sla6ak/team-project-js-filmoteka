import { Fetch } from './class-fetch';
import render from '../templates/film-details.hbs';

export class Render extends Fetch {
  constructor(films) {
    // this.renderBox = document.querySelector('#render');
    super(films);
  }
  //   get x() {
  //     console.log();
  //   }
  //   set x(newWord) {
  //     console.log();
  //   }
  // додаємо слухачі подій
  addEventListenerOnRenderBox = () => {
    this.refs.renderBox.addEventListener('click', onRenderBoxClick);
  };
  // сюди приходять дані після фетча

  // рендер фільмів на головній сторінці
  renderFilmsCardMarkup = films => {
    this.refs.renderBox.innertHTML = render({ films });
  };

  onRenderBoxClick = event => {
    if (event.target.className !== '.film-card') {
      return;
    }

    // перевіряємо чи клік був на карточці з фільмом
    // якщо так, очищуємо вміст модалки через innertHTML = ''
    // рендеримо розмітку модалки, підставляємо туди дані і додаємо розмітку через
    // insertAdjacentHTML('beforeend', murkup);
  };
}
