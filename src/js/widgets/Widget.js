class Widget {
  constructor(title) {
    this.title = title;
    this.optionsList = null;
  }

  getHeaderTemplate() {
    const root = document.createElement('div');

    const template = `
    <p class="title">${this.title}</p>          
    <div class="widget-options">
      <button class="btn-options" aria-label="Open widget options">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" preserveAspectRatio="none">
          <path d="M10.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2zM10.001 5.2c1.215 0 2.199-0.986 2.199-2.2s-0.984-2.2-2.199-2.2c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2zM10.001 14.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2z"></path>
        </svg>
      </button>
      <ul class="options-list">
        <li>
          <a href="#">Info</a>
        </li>
      </ul>
    </div>
  `;

    root.classList.add('widget-header');
    root.insertAdjacentHTML('afterbegin', template);

    return root;
  }

  addWidgetHeaderListener() {
    const btnOptions = this.root.querySelector('.btn-options');
    this.optionsList = this.root.querySelector('.options-list');

    btnOptions.addEventListener('click', () => {
      this.optionsList.classList.toggle('show-options');

      this.emitter.emit('click:btn-options', {
        title: this.title,
      });
    });
  }

  addBtnOptionsEmitter() {
    this.emitter.subscribe('click:btn-options', data => {
      if(data.title !== this.title) {
        this.optionsList.classList.remove('show-options');
      }
    });
  }
}

export default Widget;
