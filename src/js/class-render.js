import { Fetch } from './class-fetch';
import render from '../templates/film-details.hbs';

export class Render extends Fetch {
  constructor(films) {
    super(films);
    // это полная инфа о фильме
    this.fullModal = ''; // ответ сервера по запросу конкретного фильма
    this.videoKeyYoutube = null; // перезаписываемая url на youTube
    this.youtubeImg = '../images/no-foto.png'; // презаписываемая ссылка на url картинок
    this.titleCard = [];
    this.liID; // id фильма с которым работает модалка передаем в локальное хранение
  }

  // очистка всего рендера
  renderBoxCleaner = () => {
    this.refs.renderBox.innerHTML = '';
  };

  // рендер фільмів на головній сторінці
  renderFilmsCardMarkup = async results => {
    try {
      const resultsFilms = await results;
      if (resultsFilms == '') {
        this.refs.notification.classList.remove('notification-none');
        return;
      }
      this.refs.notification.classList.add('notification-none');
      this.renderBoxCleaner();

      this.ganresList = await this.fetchGenresList();

      resultsFilms.forEach(film => {
        let genreArr = [];
        for (let genre_id of film.genre_ids) {
          for (let i = 0; i < this.ganresList.length; i += 1) {
            if (this.ganresList[i].id === genre_id) {
              genreArr.push(' ' + this.ganresList[i].name);
            }
          }
        }

        if (genreArr.length >= 3) {
          genreArr.length = 3;
          genreArr[2] = this.transleter.genreArr2;
        }

        film.genre_ids = genreArr;
      });

      resultsFilms.forEach(element => {
        this.refs.renderBox.insertAdjacentHTML('beforeend', render({ element }));
        this.titleCard = document.querySelectorAll('.js-film-card__film-name');
      });

      this.refs.renderBox.addEventListener('click', this.onRenderBoxClick);
    } catch (error) {
      alert('Sorry, something went wrong');
    }
  };

  // отрисовка модалки с полной инфой о фильме
  onRenderBoxClick = async event => {
    try {
      // ли-ивент это элемент верстки хранящий идишку
      let li = event.target.closest('.film-card');
      if (!li) {
        return;
      }
      this.liID = li.dataset.source;
      this.fullModal = await this.fetchFilmsInfo(this.liID);
      this.refs.backdropCardFilm.classList.remove('visually-hidden');
      this.refs.body.classList.add('no-scroll');
      this.refs.closeModalInfoBtn.addEventListener('click', this.onModalCloseCross);
      this.refs.backdropCardFilm.addEventListener('click', this.onModalClouseClick);
      window.addEventListener('keydown', this.onEscKeyPres);

      // проверим есть ли фильмы в массиве сохраненных
      this.isFilmsSave();

      //проверим есть ли описание к фильму на нашем языке
      if (this.fullModal.overview.length == false) {
        this.refs.aboutApi.textContent = this.transleter.aboutApi;
      } else {
        this.refs.aboutApi.textContent = `${this.fullModal.overview}`;
      }

      this.refs.modalImage.src = `${this.BASE_IMG_URL}${this.fullModal.poster_path}`;
      if (this.fullModal.videos.results[0]) {
        this.videoKeyYoutube = this.fullModal.videos.results[0].key;
      } else {
        this.videoKeyYoutube = null;
        this.youtubeImg = '../images/no-foto.png';
      }

      this.refs.modalName.textContent = `${this.fullModal.title.toUpperCase()}`;
      this.refs.modalRate.textContent = `${this.fullModal.vote_average}`;
      this.refs.modalVotes.textContent = `${this.fullModal.vote_count}`;
      this.refs.modalPopularity.textContent = `${this.fullModal.popularity.toFixed(1)}`;
      this.refs.modalTitle.textContent = `${this.fullModal.original_title.toUpperCase()}`;
      let ganres = this.fullModal.genres.map(g => g.name).join(', ');
      this.refs.modalGanre.textContent = `${ganres}`;
      this.refs.prewiuModalka.addEventListener('click', this.onTrailerClick);
    } catch (error) {
      alert('Sorry, something went wrong');
    }
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
  renderFilmsCardById = async argumentWatch => {
    try {
      this.renderBoxCleaner();

      const y = this.currentPage;
      const start = this.itemsPerPage * (y - 1);
      const end = this.itemsPerPage * y;

      if (argumentWatch) {
        this.arrWatched.slice(start, end).forEach(async element => {
          const respW = await this.fetchFilmsInfo(element);
          this.refs.renderBox.insertAdjacentHTML('beforeend', render({ respW }));
        });
      } else {
        this.arrQueue.slice(start, end).forEach(async elemt => {
          const respQ = await this.fetchFilmsInfo(elemt);
          this.refs.renderBox.insertAdjacentHTML('beforeend', render({ respQ }));
        });
      }
      this.refs.renderBox.addEventListener('click', this.onRenderBoxClick);
    } catch (error) {
      alert('Sorry, something went wrong');
    }
  };

  //кнопки модалки
  isFilmsSave = () => {
    if (this.arrWatched.includes(this.liID)) {
      this.refs.modalWatchedBt.innerHTML = this.transleter.modalWatchedBtDel;
      this.refs.modalWatchedBt.classList.add('delite-of-watched');
    } else {
      this.refs.modalWatchedBt.innerHTML = this.transleter.modalWatchedBtAdd;
      this.refs.modalWatchedBt.classList.remove('delite-of-watched');
    }
    if (this.arrQueue.includes(this.liID)) {
      this.refs.modalQueueBt.innerHTML = this.transleter.modalQueueBtDel;

      this.refs.modalQueueBt.classList.add('delite-of-queue');
    } else {
      this.refs.modalQueueBt.innerHTML = this.transleter.modalQueueBtAdd;

      this.refs.modalQueueBt.classList.remove('delite-of-queue');
    }
  };
}
