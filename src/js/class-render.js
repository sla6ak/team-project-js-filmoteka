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
    this.refs.renderBox.addEventListener('click', this.onRenderBoxClick);
  };
  // сюди приходять дані після фетча

  // рендер фільмів на головній сторінці
  renderFilmsCardMarkup = async results => {
    console.log('промис', results);
    const resultsFilms = await results;
    resultsFilms.forEach(element => {
      this.refs.renderBox.insertAdjacentHTML('beforeend', render({ element }));
    });
  };

  onRenderBoxClick = event => {
    console.log(event.target.className);
    if (event.currentTarget.className !== '.film-card') {
      return;
    }

    // перевіряємо чи клік був на карточці з фільмом
    // якщо так, очищуємо вміст модалки через innertHTML = ''
    // рендеримо розмітку модалки, підставляємо туди дані і додаємо розмітку через
    // insertAdjacentHTML('beforeend', murkup);
  };
}
