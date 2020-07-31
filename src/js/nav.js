export default (() => {
  const btnNavMinimizeToggle = document.querySelector('.header .btn-nav-toggle');
  const btnMobileNavToggle = document.querySelector('.header .btn-mobile-nav-toggle');
  const nav = document.querySelector('.nav');
  const navItems = document.querySelectorAll('.nav .nav-item');
  const btnsSubNavToggle = document.querySelectorAll('.nav .nav-item .btn-sub-nav-toggle');
  const subNav = document.querySelectorAll('.sub-nav');
  const subNavLinks = document.querySelectorAll('.sub-nav a');
  let currentOpenedNavListIndex = null;
  let isNavMinimize = null;
  let cookieNavState = null;

  const cookieTime = 7 * 24 * 60 * 60; // Seconds

  const getCookie = function(name) {
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = function(value) {
    document.cookie = `navState=${value}; path=/; max-age=${cookieTime}`;
  };

  const navMinimizeCondition = function() {
    cookieNavState = getCookie('navState');

    if((window.innerWidth <= 1280 && window.innerWidth >= 920) || cookieNavState === 'minimize') {
      return true;
    } else {
      return false;
    }
  };

  const enableSubNavTabIndex = function(index) {
    const links = document.querySelectorAll(`.nav .nav-item:nth-child(${index + 1}) a`);
    links.forEach(link => link.setAttribute('tabindex', '0'));
  };

  const disableSubNavTabIndex = function() {
    subNavLinks.forEach(link => link.setAttribute('tabindex', '-1'));
  };

  const openSubNav = function(index) {
    const regExpGetNum = /\d+/;

    const liHeight = parseInt(subNav[0].firstElementChild.clientHeight, 10);
    const liBorder = getComputedStyle(subNav[0].firstElementChild)
      .getPropertyValue('border-bottom-width')
      .match(regExpGetNum)[0];
    const borders = subNav[index].childElementCount * liBorder;
    const subNavHeight = (subNav[index].childElementCount + 1) * liHeight + borders;

    navItems[index].style.height = `${subNavHeight}px`;
    navItems[index].classList.add('sub-nav-open');

    enableSubNavTabIndex(index);
  };

  const closeSubNav = function() {
    navItems.forEach(list => {
      list.classList.remove('sub-nav-open');
      list.style.height = '70px';
    });
    currentOpenedNavListIndex = null;

    disableSubNavTabIndex();
  };

  const openMinimizedNav = function(i) {
    navItems[i].classList.add('nav-minimized-open');
    enableSubNavTabIndex(i);
  };

  const closeMinimizedNav = function() {
    navItems.forEach(list => list.classList.remove('nav-minimized-open'));
    disableSubNavTabIndex();
  };

  const subNavToggle = function(index) {
    if(index === currentOpenedNavListIndex) {
      closeSubNav();
    } else {
      closeSubNav();
      currentOpenedNavListIndex = index;
      openSubNav(index);
    }
  };

  const navMinimizeToggle = function() {
    isNavMinimize ? setCookie('notMinimize') : setCookie('minimize');
    isNavMinimize = !isNavMinimize;
    closeSubNav();
    closeMinimizedNav();
    nav.classList.toggle('nav-minimize');
  };

  const subNavMinimizedToggle = function(i) {
    if(!navItems[i].classList.contains('nav-minimized-open')) {
      closeMinimizedNav();
      openMinimizedNav(i);
    } else {
      closeMinimizedNav();
    }
  };

  const init = function() {
    cookieNavState = getCookie('navState');

    switch (cookieNavState) {
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

    if(navMinimizeCondition()) {
      isNavMinimize = true;
      nav.classList.add('nav-minimize');
    } else {
      isNavMinimize = false;
    }

    disableSubNavTabIndex();
  };

  init();

  btnNavMinimizeToggle.addEventListener('click', navMinimizeToggle);
  btnMobileNavToggle.addEventListener('click', closeSubNav);

  navItems.forEach((item, i) => {
    item.addEventListener('click', e => {
      if((!isNavMinimize && e.target.closest('.btn-sub-nav-toggle')) || window.innerWidth <= 920) {
        subNavToggle(i);
      }
    });
  });

  btnsSubNavToggle.forEach((btn, i) => {
    btn.addEventListener('keyup', e => {
      if(navMinimizeCondition()) {
        if(e.key === 'Enter' && btn === document.activeElement) {
          subNavMinimizedToggle(i);
        }
      }
    });
  });

  nav.addEventListener('mouseenter', () => {
    if(navMinimizeCondition()) {
      closeMinimizedNav();
    }
  });

  window.addEventListener('click', e => {
    if(navMinimizeCondition() && !e.target.closest('.nav')) {
      closeMinimizedNav();
    }
  });

  window.addEventListener('resize', () => {
    closeSubNav();
    closeMinimizedNav();

    if(navMinimizeCondition()) {
      isNavMinimize = true;
      nav.classList.add('nav-minimize');
    } else {
      isNavMinimize = false;
      nav.classList.remove('nav-minimize');
    }
  });
})();
