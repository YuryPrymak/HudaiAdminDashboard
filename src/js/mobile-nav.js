export default (() => {
  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  const btnNavToggle = document.querySelector('.header .btn-mobile-nav-toggle');
  const btnSvg = document.querySelector('.header .btn-mobile-nav-toggle svg');
  let navIsClosed = true;

  const openNav = function() {
    navIsClosed = false;
    document.body.style.overflow = 'hidden';
    btnSvg.classList.remove('btn-toggle-svg-close');
    btnSvg.classList.add('btn-toggle-svg-open');
    header.classList.add('header-mobile-open');
    nav.classList.add('nav-mobile-open');
    nav.classList.remove('nav-minimize');
  };

  const closeNav = function() {
    navIsClosed = true;
    document.body.style.overflow = 'visible';
    btnSvg.classList.remove('btn-toggle-svg-open');
    btnSvg.classList.add('btn-toggle-svg-close');
    header.classList.remove('header-mobile-open');
    nav.classList.remove('nav-mobile-open');
  };

  btnNavToggle.addEventListener('click', () => {
    navIsClosed ? openNav() : closeNav();
  });

  window.addEventListener('resize', () => {
    closeNav();
    btnSvg.classList.remove('btn-toggle-svg-open');
    btnSvg.classList.remove('btn-toggle-svg-close');
  });
})();
