import { Fetch } from './class-fetch';
import render from '../templates/film-details.hbs';

export class Render extends Fetch {
  constructor(films) {
    super(films);
    // это полная инфа о фильме
    this.fullInfoModal = null;
  }

  // рендер фільмів на головній сторінці
  renderFilmsCardMarkup = async results => {
    const resultsFilms = await results;
    this.refs.renderBox.innerHTML = '';
    resultsFilms.forEach(element => {
      this.refs.renderBox.insertAdjacentHTML('beforeend', render({ element }));
    });
    this.refs.renderBox.addEventListener('click', this.onRenderBoxClick);
  };

  onRenderBoxClick = async event => {
    if (event.target.className !== 'film-image') {
      return;
    }
    // console.log('film');
    this.refs.backdropCardFilm.classList.remove('visually-hidden');
    this.refs.body.classList.add('no-scroll');
    this.refs.backdropCardFilm.addEventListener('click', this.onModalClouseClick);

    window.addEventListener('keydown', this.onEscKeyPres);

    this.fullModal = await this.fetchFilmsInfo(event.target.dataset.source);
    this.refs.aboutApi.innerHTML = this.fullModal.overview;
    this.refs.prewiuModalka.innerHTML = `<img src="${this.BASE_IMG_URL}/${this.fullModal.poster_path}" data-source="" alt="" class="modal-img">
    <div class="youtube">
    <img src="../images/yout.png" data-source="" alt="" class="youtube-img">
    </div>`;
    this.refs.modalName.textContent = `${this.fullModal.title.toUpperCase()}`;
    this.refs.modalRate.textContent = `${this.fullModal.vote_average}`;
    this.refs.modalVotes.textContent = `/ ${this.fullModal.vote_count}`;
    this.refs.modalPopularity.textContent = `${this.fullModal.popularity.toFixed(1)}`;
    this.refs.modalTitle.textContent = `${this.fullModal.original_title.toUpperCase()}`;
    let ganres = this.fullModal.genres.map(g => g.name).join(', ');
    this.refs.modalGanre.textContent = `${ganres}`;

    // перевіряємо чи клік був на карточці з фільмом
    // якщо так, очищуємо вміст модалки через innertHTML = ''
    // рендеримо розмітку модалки, підставляємо туди дані і додаємо розмітку через
    // insertAdjacentHTML('beforeend', murkup);
  };

  // функция закрывает модалку по бекдропу
  onModalClouseClick = evn => {
    if (evn.target.className !== 'backdrop') {
      return;
    }

    this.refs.body.classList.remove('no-scroll');
    this.refs.backdropCardFilm.classList.add('visually-hidden');
  };

  onEscKeyPres = evn => {
    if (evn.code !== 'Escape') {
      return;
    }
    this.refs.body.classList.remove('no-scroll');
    this.refs.backdropCardFilm.classList.add('visually-hidden');
    window.removeEventListener('keydown', this.onEscKeyPres);
  };

  onLibraryClick = () => {
    this.refs.blokSearch.classList.add('visually-hidden');
    this.refs.blokBtnHeader.classList.remove('visually-hidden');
  };
  onHomeClick = () => {
    this.refs.blokSearch.classList.remove('visually-hidden');
    this.refs.blokBtnHeader.classList.add('visually-hidden');
  };
}
