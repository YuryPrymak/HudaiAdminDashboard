class Widget {
  constructor(title) {
    this.title = title;
  }

  getHeaderTemplate() {
    const root = document.createElement('div');

    const template = `
    <p class="title">${this.title}</p>          
    <div class="widget-options">
      <button class="btn-options">
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
}

export default Widget;
