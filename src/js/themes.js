export default (() => {
  const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');

  const defaultTheme = 'dark';

  const cookieTime = 7 * 24 * 60 * 60; // Seconds

  const getCookie = function(name) {
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = function(value) {
    document.cookie = `colorTheme=${value}; path=/; max-age=${cookieTime}`;
  };

  const replaceClass = function(addClass, removeClass) {
    document.documentElement.classList.add(addClass);
    document.documentElement.classList.remove(removeClass);
  };

  let cookieValue = getCookie('colorTheme');

  switch (cookieValue) {
    case 'dark':
      setCookie('dark');
      replaceClass('theme-dark', 'theme-light');
      break;
    case 'light':
      setCookie('light');
      replaceClass('theme-light', 'theme-dark');
      break;
    default:
      setCookie(defaultTheme);
      document.documentElement.classList.add('theme-dark');
      break;
  }

  btnThemesToggle.addEventListener('click', () => {
    cookieValue = getCookie('colorTheme');

    if(cookieValue === 'dark') {
      setCookie('light');
      replaceClass('theme-light', 'theme-dark');
    } else if(cookieValue === 'light') {
      setCookie('dark');
      replaceClass('theme-dark', 'theme-light');
    }
  });
})();
