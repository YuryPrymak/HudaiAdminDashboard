export default (() => {
  const navList = document.querySelectorAll('.nav .nav-item');
  const subNav = document.querySelectorAll('.sub-nav');
  let currentOpenedElIndex = null;

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

  navList.forEach((item, i) => {
    item.addEventListener('click', e => {
      if(e.target.nodeName === 'BUTTON' || e.target.closest('.btn-sub-nav-toggle')) {
        subNavToggle(i);
      }
    });
  });
})();
