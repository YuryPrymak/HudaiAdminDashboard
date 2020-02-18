export default (() => {
  const searchInput = document.querySelector('.widget-contacts .input-search-contact');
  const btnClear = document.querySelector('.widget-contacts .btn-clear');
  const contactsList = document.querySelector('.widget-contacts .contacts');
  const contacts = document.querySelectorAll('.widget-contacts .contact');
  const contactsName = document.querySelectorAll('.widget-contacts .contact .name');

  searchInput.addEventListener('input', e => {
    let hiddenContacts = 0;

    contacts.forEach(el => el.classList.remove('hide-contact'));
    contactsName.forEach((el, i) => {
      if(el.textContent.indexOf(e.target.value) === -1) {
        contacts[i].classList.add('hide-contact');
        hiddenContacts += 1;
      }
    });

    if(hiddenContacts === contacts.length) {
      contactsList.classList.add('contacts-list-empty');
    } else {
      contactsList.classList.remove('contacts-list-empty');
    }
  });

  btnClear.addEventListener('click', () => {
    searchInput.value = '';
    contactsList.classList.remove('contacts-list-empty');
    contacts.forEach(el => el.classList.remove('hide-contact'));
  });
})();
