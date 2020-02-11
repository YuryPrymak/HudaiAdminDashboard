export default (() => {
  const btnOptions = document.querySelector('.widget-contacts .btn-options');
  const optionsList = document.querySelector('.widget-contacts .options-list');
  const searchInput = document.querySelector('.widget-contacts .input-search-contact');
  const btnClear = document.querySelector('.widget-contacts .btn-clear');
  const contacts = document.querySelectorAll('.widget-contacts .contact');
  const contactsName = document.querySelectorAll('.widget-contacts .contact .name');

  searchInput.addEventListener('input', e => {
    contacts.forEach(el => el.classList.remove('hide-contact'));
    contactsName.forEach((el, i) => {
      if(el.textContent.indexOf(e.target.value) === -1) {
        contacts[i].classList.add('hide-contact');
      }
    });
  });

  btnClear.addEventListener('click', () => {
    searchInput.value = '';
    contacts.forEach(el => el.classList.remove('hide-contact'));
  });

  btnOptions.addEventListener('click', () => {
    optionsList.classList.toggle('show-options');
  });
})();
