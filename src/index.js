import './sass/main.scss';
import { LocalSave } from './js/class-localsave';

const init = new LocalSave();
(() => {
  init.start();
  init.themaStart();
  init.languageStart();
  init.paginationStart();
  init.EventListenerForInput();
  // const a = init.fetchSearchFilms();
  // console.log(a);
  // console.log(init.fetchPopularFilms());
})();
