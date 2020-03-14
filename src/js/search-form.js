export default (() => {
  const btnSearch = document.querySelector('.header .btn-search-input-toggle');
  const searchForm = document.querySelector('.header .search-form');
  const searchInput = document.querySelector('.header .search-input');

  btnSearch.addEventListener('click', () => {
    searchForm.classList.toggle('show-search-input');
    searchInput.focus();
  });

  window.addEventListener('click', e => {
    if(!e.target.classList.contains('search-input') && !e.target.closest('.header .btn-search-input-toggle')) {
      searchForm.classList.remove('show-search-input');
    }
  });
})();
