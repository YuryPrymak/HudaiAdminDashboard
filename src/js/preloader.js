export default (() => {
  const preloader = document.querySelector('.preloader');
  const preloaderDots = document.querySelector('.preloader .dots');

  window.addEventListener('load', () => {
    preloader.classList.add('preloader-done');
    preloaderDots.style.display = 'none';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 300);
  });
})();
