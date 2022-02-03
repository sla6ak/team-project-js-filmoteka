import { Fetch } from './class-fetch';
import render from '../templates/film-details.hbs';

export class Render extends Fetch {
  constructor(films) {
    super(films);
    // это полная инфа о фильме
    this.fullInfoModal = null;
    this.videoKeyYoutube = '';
    this.youtubeImg = '';
    this.titleCard = [];
    this.fullModal = '';
  }

  // очистка всего рендера
  renderBoxCleaner = () => {
    this.refs.renderBox.innerHTML = '';
  };

  // рендер фільмів на головній сторінці
  renderFilmsCardMarkup = async results => {
    const resultsFilms = await results;
    if (resultsFilms == '') {
      this.refs.notification.classList.remove('notification-none');
      return;
    }
    this.refs.notification.classList.add('notification-none');
    this.renderBoxCleaner();
    resultsFilms.forEach(element => {
      this.refs.renderBox.insertAdjacentHTML('beforeend', render({ element }));
      this.titleCard = document.querySelectorAll('.js-film-card__film-name');
    });
    this.ganresList = await this.fetchGenresList();

    this.refs.renderBox.addEventListener('click', this.onRenderBoxClick);
  };

  // отрисовка модалки с полной инфой о фильме
  onRenderBoxClick = async event => {
    // ли-ивент это элемент верстки хранящий идишку
    let liEvent = event.target.closest('.film-card');

    if (!liEvent) {
      return;
    }
    this.fullModal = await this.fetchFilmsInfo(liEvent.dataset.source);
    this.refs.backdropCardFilm.classList.remove('visually-hidden');
    this.refs.body.classList.add('no-scroll');
    this.refs.closeModalInfoBtn.addEventListener('click', this.onModalCloseCross);
    this.refs.backdropCardFilm.addEventListener('click', this.onModalClouseClick);
    window.addEventListener('keydown', this.onEscKeyPres);

    if (this.fullModal.overview.length == false) {
      if (this.curentLanguage === 'uk') {
        this.refs.aboutApi.textContent = 'На жаль, опис фільму українською мовою відсутній :(';
      } else {
        this.refs.aboutApi.textContent = 'i am sorry this info loose :(';
      }
    } else {
      this.refs.aboutApi.textContent = `${this.fullModal.overview}`;
    }

    this.refs.modalImage.src = `${this.BASE_IMG_URL}${this.fullModal.poster_path}`;
    if (this.fullModal.videos.results[0]) {
      this.videoKeyYoutube = this.fullModal.videos.results[0].key;
    } else {
      this.videoKeyYoutube = '';
      this.youtubeImg = '';
    }

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
    if (event.target !== this.refs.backdropVideo) {
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
    this.refs.header.classList.add('header--library');
    this.refs.renderBox.innerHTML = '';
  };

  onHomeClick = () => {
    this.refs.containerPagination.classList.remove('visually-hidden');
    this.refs.header.classList.remove('header--library');
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

  openModalFooter = () => {
    this.refs.ourTeam.addEventListener('click', () => {
      this.refs.backdropFooter.classList.remove('visually-hidden');
      this.refs.body.classList.add('no-scroll');
      this.closeModalFooter();
    });
  };

  closeModalFooter = () => {
    this.refs.backdropFooter.addEventListener('click', event => {
      if (event.target.className !== 'backdropFooterModal') {
        return;
      }
      this.refs.backdropFooter.classList.add('visually-hidden');
      this.refs.body.classList.remove('no-scroll');
    });
    this.refs.closeFooterBt.addEventListener('click', () => {
      this.refs.backdropFooter.classList.add('visually-hidden');
      this.refs.body.classList.remove('no-scroll');
    });
    window.addEventListener('keydown', this.onEscKeyFooter);
  };

  onEscKeyFooter = evn => {
    if (evn.code !== 'Escape') {
      return;
    }
    this.refs.body.classList.remove('no-scroll');
    this.refs.backdropFooter.classList.add('visually-hidden');
    window.removeEventListener('keydown', this.onEscKeyFooter);
  };

  //тут нам прилетает аргумент булен и мы знаем рендерить просмотреные карточки либо еще нет
  renderFilmsCardById = argumentWatch => {
    this.renderBoxCleaner();
    if (argumentWatch) {
      console.log('уже смотрел', this.arrWatched.length, this.arrWatched); //тестируем данные длинну и содержимое
      if (this.arrWatched.length > 0) {
        this.arrWatched.forEach(element => {
          this.refs.renderBox.insertAdjacentHTML('beforeend', render({ element }));
        });
      }
    } else {
      console.log('в плане', this.arrQueue.length, this.arrQueue); //тестируем данные длинну и содержимое
      if (this.arrQueue > 0) {
        this.arrQueue.forEach(element => {
          this.refs.renderBox.insertAdjacentHTML('beforeend', render({ element }));
        });
      }
    }
  };
}
