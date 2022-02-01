import { Fetch } from './class-fetch';
import render from '../templates/film-details.hbs';

export class Render extends Fetch {
  constructor(films) {
    super(films);
    // это полная инфа о фильме
    this.fullInfoModal = null;
    this.videoKeyYoutube = '';
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
    let li = event.target.closest('.film-card');
    // console.log(li);
    if (!li) {
      return;
    }
    this.fullModal = await this.fetchFilmsInfo(li.dataset.source);
    // console.log(this.fullModal);
    this.refs.backdropCardFilm.classList.remove('visually-hidden');
    this.refs.body.classList.add('no-scroll');
    this.refs.closeModalInfoBtn.addEventListener('click', this.onModalCloseCross);
    this.refs.backdropCardFilm.addEventListener('click', this.onModalClouseClick);
    window.addEventListener('keydown', this.onEscKeyPres);
    if (this.fullModal.overview.length === 0) {
      this.refs.aboutApi.textContent = 'На жаль, опис фільму українською мовою відсутній :(';
    } else {
      this.refs.aboutApi.textContent = `${this.fullModal.overview}`;
    }
    // this.refs.prewiuModalka.innerHTML = `<img src="${this.BASE_IMG_URL}/${this.fullModal.poster_path}" data-source="" alt="" class="modal-img">
    // <div class="youtube">
    // <img src="../images/yout.png" data-source="" alt="" class="youtube-img">
    // </div>`;
    this.refs.modalImage.src = `${this.BASE_IMG_URL}${this.fullModal.poster_path}`;
    this.refs.modalName.textContent = `${this.fullModal.title.toUpperCase()}`;
    this.refs.modalRate.textContent = `${this.fullModal.vote_average}`;
    this.refs.modalVotes.textContent = `${this.fullModal.vote_count}`;
    this.refs.modalPopularity.textContent = `${this.fullModal.popularity.toFixed(1)}`;
    this.refs.modalTitle.textContent = `${this.fullModal.original_title.toUpperCase()}`;
    let ganres = this.fullModal.genres.map(g => g.name).join(', ');
    this.refs.modalGanre.textContent = `${ganres}`;

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
      width="640"
      height="360"
      frameborder="0"
      allowfullscreen
      allow="autoplay; encrypted-media"></iframe>
    </div>`;
    this.refs.backdropVideo.addEventListener('click', this.onVideoClick);
  };

  onVideoClick = event => {
    event.preventDefault();

    if (event.target.className !== 'backdrop-video') {
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
    this.refs.modalImage.src = '';
  };

  onEscKeyPres = evn => {
    if (evn.code !== 'Escape') {
      return;
    }
    this.refs.body.classList.remove('no-scroll');
    this.refs.backdropCardFilm.classList.add('visually-hidden');
    this.refs.modalImage.src = '';
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

  // закрытие модалки по клику на крестик
  onModalCloseCross = () => {
    this.refs.backdropCardFilm.classList.add('visually-hidden');
    this.refs.body.classList.remove('no-scroll');
    this.refs.modalImage.src = '';
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
