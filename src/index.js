import './sass/main.scss';
import { LocalSave } from './js/class-localsave';
import { Fetch } from './js/class-fetch';

const fetch = new Fetch();

const init = new LocalSave();
(() => {
  init.start();
  console.log(init.getRefs());
})();



