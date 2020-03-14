export default (() => {
  const btnNavMinimizeToggle = document.querySelector('.header .btn-nav-toggle');
  const btnNavToggle = document.querySelector('.header .btn-mobile-nav-toggle');
  const nav = document.querySelector('.nav');
  const navList = document.querySelectorAll('.nav .nav-item');
  const subNav = document.querySelectorAll('.sub-nav');
  let currentOpenedElIndex = null;
  let isNavMinimize = null;

  const closeSubNav = function() {
    navList.forEach(el => {
      el.classList.remove('sub-nav-open');
      el.style.height = '70px';
    });
  };

  const openSubNav = function(index) {
    const liHeight = parseInt(subNav[0].firstElementChild.clientHeight, 10);
    const liBorder = getComputedStyle(subNav[0].firstElementChild).getPropertyValue('border-bottom')[0];
    const borders = subNav[index].childElementCount * liBorder;
    const subNavHeight = (subNav[index].childElementCount + 1) * liHeight + borders;

    navList[index].style.height = `${subNavHeight}px`;
    navList[index].classList.add('sub-nav-open');
  };

  const subNavToggle = function(index) {
    if(index === currentOpenedElIndex) {
      closeSubNav();
      currentOpenedElIndex = null;
    } else {
      currentOpenedElIndex = index;
      closeSubNav();
      openSubNav(index);
    }
  };

  const navMinimizeToggle = function() {
    nav.classList.toggle('nav-minimize');
  };

  navList.forEach((item, i) => {
    item.addEventListener('click', e => {
      if(!isNavMinimize && e.target.closest('.btn-sub-nav-toggle')) {
        subNavToggle(i);
      }
    });
  });

  btnNavMinimizeToggle.addEventListener('click', () => {
    isNavMinimize = !isNavMinimize;
    closeSubNav();
    navMinimizeToggle();
  });

  btnNavToggle.addEventListener('click', closeSubNav);

  window.addEventListener('resize', () => {
    if(window.innerWidth <= 1280 && window.innerWidth >= 920) {
      isNavMinimize = true;
      closeSubNav();
      nav.classList.add('nav-minimize');
    } else if(window.innerWidth < 920) {
      isNavMinimize = false;
    }
  });

  window.addEventListener('load', () => {
    window.innerWidth <= 1280 && window.innerWidth >= 920 ? isNavMinimize = true : isNavMinimize = false;
    if(isNavMinimize) {
      closeSubNav();
      nav.classList.add('nav-minimize');
    }
  });
})();
