import { Fetch } from './class-fetch';
import render from '../templates/film-details.hbs';
import i from '../images/yout.png';

export class Render extends Fetch {
  constructor(films) {
    super(films);
    // это полная инфа о фильме
    this.fullInfoModal = null;
    this.videoKeyYoutube = '';
    this.youtubeImg = '';
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
    this.refs.closeModalInfoBtn.addEventListener('click', this.onModalCloseCross);
    this.refs.backdropCardFilm.addEventListener('click', this.onModalClouseClick);

    window.addEventListener('keydown', this.onEscKeyPres);
    // My work
    window.addEventListener('keydown', this.onYoutubeModalEscKeyPress);

    this.fullModal = await this.fetchFilmsInfo(event.target.dataset.source);
    // My Work
    if (this.fullModal.videos.results[0]) {
      this.videoKeyYoutube = this.fullModal.videos.results[0].key;
      this.youtubeImg = i;
    } else {
      this.videoKeyYoutube = '';
      this.youtubeImg = '';
    }
    //
    this.refs.aboutApi.innerHTML = this.fullModal.overview;
    this.refs.prewiuModalka.innerHTML = `<img src="${this.BASE_IMG_URL}/${this.fullModal.poster_path}" data-source="" alt="" class="modal-img">
    <div class="youtube">
    <img src="${this.youtubeImg}" data-source="" alt="" class="youtube-img">
    </div>`;
    this.refs.modalName.textContent = `${this.fullModal.title.toUpperCase()}`;
    this.refs.modalRate.textContent = `${this.fullModal.vote_average}`;
    this.refs.modalVotes.textContent = `/ ${this.fullModal.vote_count}`;
    this.refs.modalPopularity.textContent = `${this.fullModal.popularity.toFixed(1)}`;
    this.refs.modalTitle.textContent = `${this.fullModal.original_title.toUpperCase()}`;
    let ganres = this.fullModal.genres.map(g => g.name).join(', ');
    this.refs.modalGanre.textContent = `${ganres}`;
    this.refs.prewiuModalka.addEventListener('click', this.onTrailerClick);

    // перевіряємо чи клік був на карточці з фільмом
    // якщо так, очищуємо вміст модалки через innertHTML = ''
    // рендеримо розмітку модалки, підставляємо туди дані і додаємо розмітку через
    // insertAdjacentHTML('beforeend', murkup);
  };

  onTrailerClick = () => {
    this.refs.backdropVideo.classList.remove('visually-hidden');
    this.refs.modalVideo.innerHTML = `<div class="modal">
    <iframe class='iframe'
    id="vimeo-player"
      src="https://www.youtube.com/embed/${this.videoKeyYoutube}/frameborder=%220%22%20allow=%22accelerometer;%20autoplay;%20encrypted-media;%20gyroscope;%20picture-in-picture%22"
      frameborder="0"
      width="640"
      height="360"
      allowfullscreen
      allow="autoplay; encrypted-media"></iframe>
    </div>`;
    this.refs.backdropVideo.addEventListener('click', this.onVideoClouseClick);
  };

  onVideoClouseClick = event => {
    if (event.target.className !== 'js-modal-youtube__backdrop') {
      return;
    }
    this.refs.backdropVideo.classList.add('visually-hidden');
    this.refs.modalVideo.innerHTML = '';
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

  // My work
  onYoutubeModalEscKeyPress = evn => {
    if (evn.code !== 'Escape') {
      return;
    }
    this.refs.body.classList.remove('no-scroll');
    this.refs.backdropVideo.classList.add('visually-hidden');
    window.removeEventListener('keydown', this.onYoutubeModalEscKeyPress);
  };

  onLibraryClick = () => {
    this.refs.blokSearch.classList.add('visually-hidden');
    this.refs.blokBtnHeader.classList.remove('visually-hidden');
  };
  onHomeClick = () => {
    this.refs.blokSearch.classList.remove('visually-hidden');
    this.refs.blokBtnHeader.classList.add('visually-hidden');
  };

  // закрытие модалки по клику на крестик
  onModalCloseCross = () => {
    this.refs.backdropCardFilm.classList.add('visually-hidden');
    this.refs.body.classList.remove('no-scroll');
    this.refs.closeModalInfoBtn.removeEventListener('click', this.onModalCloseCross);
  };

  onWatchedClick = () => {
    this.refs.headerWathedBtn.classList.replace('queue-btn', 'watched-btn');
    this.refs.headerQueueBtn.classList.replace('watched-btn', 'queue-btn');
  };
  onQueueClick = () => {
    this.refs.headerWathedBtn.classList.replace('watched-btn', 'queue-btn');
    this.refs.headerQueueBtn.classList.replace('queue-btn', 'watched-btn');
  };
}
