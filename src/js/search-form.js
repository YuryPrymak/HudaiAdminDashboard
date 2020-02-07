export default (() => {
  const btnSearch = document.querySelector('.header .btn-search');
  const searchForm = document.querySelector('.header .search-form');

  btnSearch.addEventListener('click', () => searchForm.classList.toggle('show-search-input'));
})();
