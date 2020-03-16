export default (() => {
  const btnNavMinimizeToggle = document.querySelector('.header .btn-nav-toggle');
  const btnNavToggle = document.querySelector('.header .btn-mobile-nav-toggle');
  const nav = document.querySelector('.nav');
  const navList = document.querySelectorAll('.nav .nav-item');
  const subNav = document.querySelectorAll('.sub-nav');
  let currentOpenedElIndex = null;
  let isNavMinimize = null;

  const cookieTime = 7 * 24 * 60 * 60; // Seconds

  const getCookie = function(name) {
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = function(value) {
    document.cookie = `navState=${value}; path=/; max-age=${cookieTime}`;
  };

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

  const cookieValue = getCookie('navState');

  switch (cookieValue) {
    case 'notMinimize':
      setCookie('notMinimize');
      break;
    case 'minimize':
      setCookie('minimize');
      break;
    default:
      setCookie('notMinimize');
      break;
  }

  if((window.innerWidth <= 1280 && window.innerWidth >= 920) || cookieValue === 'minimize') {
    isNavMinimize = true;
    closeSubNav();
    nav.classList.add('nav-minimize');
  } else {
    isNavMinimize = false;
  }

  navList.forEach((item, i) => {
    item.addEventListener('click', e => {
      if(!isNavMinimize && e.target.closest('.btn-sub-nav-toggle')) {
        subNavToggle(i);
      }
    });
  });

  btnNavMinimizeToggle.addEventListener('click', () => {
    const cookieValue = getCookie('navState');

    isNavMinimize ? setCookie('notMinimize') : setCookie('minimize');
    isNavMinimize = !isNavMinimize;
    closeSubNav();
    navMinimizeToggle();
  });

  btnNavToggle.addEventListener('click', closeSubNav);

  window.addEventListener('resize', () => {
    const cookieValue = getCookie('navState');
    if((window.innerWidth <= 1280 && window.innerWidth >= 920) || cookieValue === 'minimize') {
      isNavMinimize = true;
      closeSubNav();
      nav.classList.add('nav-minimize');
    } else {
      isNavMinimize = false;
      closeSubNav();
      nav.classList.remove('nav-minimize');
    }
  });
})();
