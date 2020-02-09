export default (() => {
  const optionsList = document.querySelector('.widget-site-views .options-list');
  const yearsList = document.querySelector('.widget-site-views .years-list');

  window.addEventListener('click', e => {
    if(!e.target.closest('.widget-site-views .btn-show-years-list')) {
      yearsList.classList.remove('show-years-list');
    }
    if(!e.target.closest('.widget-site-views .btn-options')) {
      optionsList.classList.remove('show-options');
    }
  });
})();
