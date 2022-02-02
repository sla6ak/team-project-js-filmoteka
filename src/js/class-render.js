import { Fetch } from './class-fetch';
import render from '../templates/film-details.hbs';

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
      const entriesGanres = Object.entries(element);
      console.log(element);
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

    // =======
    // код нижче потрібно переглянути. були зміни у коді для рендеру модалки по кліку. а саме li = event.terget('.film-card')
    // це для того щоб клік ловився на лішці. там і data-source тепер н лішці висить.
    this.fullModal = await this.fetchFilmsInfo(event.target.dataset.source);
    // My Work
    if (this.fullModal.videos.results[0]) {
      this.videoKeyYoutube = this.fullModal.videos.results[0].key;
    } else {
      this.videoKeyYoutube = '';
      this.youtubeImg = '';
    }
    //
    this.refs.aboutApi.innerHTML = this.fullModal.overview;
    this.refs.prewiuModalka.innerHTML = `<img src="${this.BASE_IMG_URL}/${this.fullModal.poster_path}" data-source="" alt="" class="modal-img">
    <div class="youtube">
    <img src="" data-source="" alt="" class="youtube-img">
    </div>`;
    // ==== закінчується код який треба передивитись

    this.refs.modalName.textContent = `${this.fullModal.title.toUpperCase()}`;
    this.refs.modalRate.textContent = `${this.fullModal.vote_average}`;
    this.refs.modalVotes.textContent = `${this.fullModal.vote_count}`;
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
    this.refs.libraryBt.classList.add('button-nav--current');
    this.refs.homeBt.classList.remove('button-nav--current');
  };
  onHomeClick = () => {
    this.refs.blokSearch.classList.remove('visually-hidden');
    this.refs.blokBtnHeader.classList.add('visually-hidden');
    this.refs.libraryBt.classList.remove('button-nav--current');
    this.refs.homeBt.classList.add('button-nav--current');
  };

  // закрытие модалки по клику на крестик
  onModalCloseCross = () => {
    this.refs.backdropCardFilm.classList.add('visually-hidden');
    this.refs.body.classList.remove('no-scroll');
    this.refs.modalImage.src = '';
    this.refs.closeModalInfoBtn.removeEventListener('click', this.onModalCloseCross);
  };

  onWatchedClick = () => {
    this.refs.headerWathedBtn.classList.replace('back-dark', 'back-orange');
    this.refs.headerQueueBtn.classList.replace('back-orange', 'back-dark');
  };
  onQueueClick = () => {
    this.refs.headerWathedBtn.classList.replace('back-orange', 'back-dark');
    this.refs.headerQueueBtn.classList.replace('back-dark', 'back-orange');
  };
}
