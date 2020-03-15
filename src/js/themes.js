export default (() => {
  const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');

  btnThemesToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('theme-dark');
    document.documentElement.classList.toggle('theme-light');
  });
})();
