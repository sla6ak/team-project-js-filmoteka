(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open.js]'),
    closeModalBtn: document.querySelector('[data-modal-close.js]'),
    modal: document.querySelector('[data-modal.js]'),
    // modald: document.querySelector('[data-modald.js]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

   function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    // refs.modald.classList.toggle('scroll');
  }
})();


  