export default (() => {
  const optionsListSiteViews = document.querySelector('.widget-site-views .options-list');
  const yearsList = document.querySelector('.widget-site-views .years-list');

  const optionsListWeeklyEarning = document.querySelector('.widget-weekly-earning .options-list');

  window.addEventListener('click', e => {
    if(!e.target.closest('.widget-site-views .btn-show-years-list')) {
      yearsList.classList.remove('show-years-list');
    }
    if(!e.target.closest('.widget-site-views .btn-options')) {
      optionsListSiteViews.classList.remove('show-options');
    }
    if(!e.target.closest('.widget-weekly-earning .btn-options')) {
      optionsListWeeklyEarning.classList.remove('show-options');
    }
  });
})();
