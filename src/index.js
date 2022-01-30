import './sass/main.scss';
import { LocalSave } from './js/class-localsave';

const init = new LocalSave();
(() => {
  init.start();
  init.themaStart();
  init.languageStart();
  init.buildPagination();
  init.renderFilmsCardMarkup(init.fetchPopularFilms());
  // const a = init.fetchSearchFilms();
  // console.log(a);
  // console.log(init.fetchPopularFilms());
})();
