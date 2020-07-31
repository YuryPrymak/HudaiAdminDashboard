export default (() => {
  const btnProfileOptions = document.querySelector('.header .profile-options .btn-profile-options');
  const profileOptionsList = document.querySelector('.header .profile-options .options');

  const profileOptionsToggle = function(e) {
    if(e.key === 'Enter' && btnProfileOptions === document.activeElement) {
      profileOptionsList.classList.toggle('show-profile-options');
    }
  };

  const closeProfileOptions = function() {
    profileOptionsList.classList.remove('show-profile-options');
  };

  btnProfileOptions.addEventListener('keyup', e => {
    profileOptionsToggle(e);
  });

  btnProfileOptions.addEventListener('mouseenter', closeProfileOptions);
  profileOptionsList.addEventListener('mouseenter', closeProfileOptions);

  window.addEventListener('click', e => {
    if(!e.target.closest('.btn-profile-options') && !e.target.closest('.options')) {
      closeProfileOptions();
    }
  });
})();
