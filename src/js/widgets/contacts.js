import Widget from './Widget';

class Contacts extends Widget {
  constructor(emitter, widgetTitle, rootSelector, data) {
    super(widgetTitle);

    this.emitter = emitter;

    this.data = data;
    this.rootSelector = rootSelector;
    this.root = document.querySelector(this.rootSelector);
    this.contactsSelector = null;
    this.searchInput = null;

    this.render();
    this.addListeners();
  }

  getContactListTemplate() {
    const root = document.createElement('ul');

    root.classList.add('contacts');
    root.insertAdjacentHTML('afterbegin', this.getContactsTemplate(this.data));

    return root;
  }

  getContactsTemplate(contacts) {
    const getMessageCounter = messagesQuantity => {
      return messagesQuantity !== 0 ? `<div class="new-messages-counter">${messagesQuantity}</div>` : '';
    };

    const getContact = contact => `
      <li class="contact ${contact.isOnline ? 'status-online' : ''}">
        <img class="photo" src="${contact.photoUrl}" alt="Person">
        <div class="info">
          <div class="name">${contact.name}</div>
          <div class="company">${contact.company}</div>
        </div>
        <button class="btn-send-message">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="none">
            <path d="M18 7c0.542 0 1 0.458 1 1v7c0 0.542-0.458 1-1 1h-8.829l-0.171 0.171v-0.171h-3c-0.542 0-1-0.458-1-1v-7c0-0.542 0.458-1 1-1h12zM18 5h-12c-1.65 0-3 1.35-3 3v7c0 1.65 1.35 3 3 3h1v3l3-3h8c1.65 0 3-1.35 3-3v-7c0-1.65-1.35-3-3-3z"></path>
          </svg>
        </button>
        <button class="btn-send-mail">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="none">
            <path d="M3 7.921l8.427 5.899c0.34 0.235 0.795 0.246 1.147 0l8.426-5.899v10.079c0 0.272-0.11 0.521-0.295 0.705s-0.433 0.295-0.705 0.295h-16c-0.272 0-0.521-0.11-0.705-0.295s-0.295-0.433-0.295-0.705zM1 5.983c0 0.010 0 0.020 0 0.030v11.987c0 0.828 0.34 1.579 0.88 2.12s1.292 0.88 2.12 0.88h16c0.828 0 1.579-0.34 2.12-0.88s0.88-1.292 0.88-2.12v-11.988c0-0.010 0-0.020 0-0.030-0.005-0.821-0.343-1.565-0.88-2.102-0.541-0.54-1.292-0.88-2.12-0.88h-16c-0.828 0-1.579 0.34-2.12 0.88-0.537 0.537-0.875 1.281-0.88 2.103zM20.894 5.554l-8.894 6.225-8.894-6.225c0.048-0.096 0.112-0.183 0.188-0.259 0.185-0.185 0.434-0.295 0.706-0.295h16c0.272 0 0.521 0.11 0.705 0.295 0.076 0.076 0.14 0.164 0.188 0.259z"></path>
          </svg>                
        </button>
        ${getMessageCounter(contact.messages)}
      </li>
    `;

    const template = contacts.map(contact => getContact(contact)).join('');

    return template;
  }

  getSearchInputTemplate() {
    const root = document.createElement('div');

    const template = `
      <input class="input-search-contact" type="text" placeholder="Search contact ..." autocomplete="off">
      <button class="btn-clear">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="none">
          <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
        </svg>
      </button>
    `;

    root.classList.add('search-contact');
    root.insertAdjacentHTML('afterbegin', template);

    return root;
  }

  updateContacts(contacts) {
    this.contactsSelector.innerHTML = this.getContactsTemplate(contacts);
  }

  clearFilter() {
    this.searchInput.value = '';
    this.contactsSelector.classList.remove('contacts-list-empty');
    this.updateContacts(this.data);
  }

  setFilter(e) {
    const filteredContacts = [];

    this.data.forEach(contact => {
      if(contact.name.indexOf(e.target.value) !== -1) {
        filteredContacts.push(contact);
      }
    });

    this.updateContacts(filteredContacts);

    if(filteredContacts.length === 0) {
      this.contactsSelector.classList.add('contacts-list-empty');
    } else {
      this.contactsSelector.classList.remove('contacts-list-empty');
    }
  }

  render() {
    this.root.append(this.getHeaderTemplate());
    this.root.append(this.getContactListTemplate());
    this.root.append(this.getSearchInputTemplate());
  }

  addListeners() {
    const btnClear = document.querySelector(`${this.rootSelector} .btn-clear`);
    this.searchInput = document.querySelector(`${this.rootSelector} .input-search-contact`);
    this.contactsSelector = document.querySelector(`${this.rootSelector} .contacts`);

    btnClear.addEventListener('click', this.clearFilter.bind(this));

    this.searchInput.addEventListener('input', e => {
      this.setFilter(e);
    });

    this.addWidgetHeaderListener();
    this.addBtnOptionsEmitter();
  }
}

export default Contacts;
