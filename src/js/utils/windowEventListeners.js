const setWindowEventListeners = () => {
  const optionsLists = document.querySelectorAll('.widget .options-list');

  window.addEventListener('click', e => {
    if(!e.target.closest('.widget .btn-options')) {
      optionsLists.forEach(list => list.classList.remove('show-options'));
    }
  });
};

export default setWindowEventListeners;
