import './sass/main.scss';
import { LocalSave } from './js/class-localsave';

const init = new LocalSave();
(() => {
  init.start();
  console.log(init.getRefs());
})();
