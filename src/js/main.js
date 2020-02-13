export default (() => {
  const optionsListSiteViews = document.querySelector('.widget-site-views .options-list');
  const yearsList = document.querySelector('.widget-site-views .years-list');

  const optionsListWeeklyEarning = document.querySelector('.widget-weekly-earning .options-list');
  const optionsListWidgetEarnByCountry = document.querySelector('.widget-earn-by-country .options-list');
  const optionsListWidgetContacts = document.querySelector('.widget-contacts .options-list');
  const optionsListWidgetReviews = document.querySelector('.widget-reviews .options-list');
  const optionsListWidgetTasks = document.querySelector('.widget-tasks .options-list');
  const optionsListWidgetRadarChart = document.querySelector('.widget-radar-chart .options-list');

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
    if(!e.target.closest('.widget-earn-by-country .btn-options')) {
      optionsListWidgetEarnByCountry.classList.remove('show-options');
    }
    if(!e.target.closest('.widget-contacts .btn-options')) {
      optionsListWidgetContacts.classList.remove('show-options');
    }
    if(!e.target.closest('.widget-reviews .btn-options')) {
      optionsListWidgetReviews.classList.remove('show-options');
    }
    if(!e.target.closest('.widget-tasks .btn-options')) {
      optionsListWidgetTasks.classList.remove('show-options');
    }
    if(!e.target.closest('.widget-radar-chart .btn-options')) {
      optionsListWidgetRadarChart.classList.remove('show-options');
    }
  });
})();
