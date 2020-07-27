import LinearDiagram from './charts/LinearDiagram';

class SiteViews extends LinearDiagram {
  constructor(title, data, rootSelector) {
    super(title, {
      data: data[Object.keys(data)[Object.keys(data).length - 1]],
      width: document.querySelector(rootSelector).clientWidth,
      height: 390,
      valueStep: 50,
    });

    this.allData = data;
    this.regExpDataYear = /\d+/g;
    this.dataYears = [
      ...Object.keys(data)
        .join('')
        .matchAll(this.regExpDataYear)]
      .map(yearInfo => yearInfo[0]);

    this.rootSelector = rootSelector;
    this.root = document.querySelector(this.rootSelector);
    this.canvasClassName = 'linear-diagram';

    this.render();
    this.addListeners();
  }

  getCurrentYearTemplate() {
    const root = document.createElement('p');

    root.classList.add('year');
    root.append(`- ${this.dataYears[this.dataYears.length - 1]}`);

    return root;
  }

  getBtnChooseYearTemplate() {
    const root = document.createElement('div');

    const yearTemplate = year => `
      <li>
        <a class="btn-year">${year}</a>
      </li>
    `;

    const getYears = () => {
      const template = this.dataYears.map(year => yearTemplate(year)).join('');
      return template;
    };

    const getTemplate = () => `
      <button class="btn-show-years-list">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="none">
          <path d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
          </svg>
      </button>
      <ul class="years-list">
        ${getYears()}
      </ul>
    `;

    root.classList.add('year-choice');
    root.insertAdjacentHTML('afterbegin', getTemplate());

    return root;
  }

  render() {
    this.root.append(this.getHeaderTemplate());

    const headerTitle = document.querySelector(`${this.rootSelector} .widget-header .title`);

    headerTitle.after(this.getBtnChooseYearTemplate());
    headerTitle.after(this.getCurrentYearTemplate());

    this.root.append(this.getCanvas(this.canvasClassName));
    this.canvasInitValues(this.canvasClassName);
    this.canvasInitDrawing();
  }

  addListeners() {
    const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');
    const btnNavMinimizeToggle = document.querySelector('.header .btn-nav-toggle');
    const btnShowYearsList = document.querySelector('.widget-site-views .btn-show-years-list');
    const yearsList = document.querySelector('.widget-site-views .years-list');
    const yearInfo = document.querySelector('.widget-site-views .year');

    btnNavMinimizeToggle.addEventListener('click', () => this.updateCanvas('width', this.root.clientWidth));

    btnThemesToggle.addEventListener('click', this.themeToggle.bind(this));

    btnShowYearsList.addEventListener('click', () => {
      yearsList.classList.toggle('show-years-list');
    });

    yearsList.addEventListener('click', e => {
      if(e.target.nodeName === 'A') {
        const newData = this.allData[Object.keys(this.allData)
          .filter(year => year === `data${e.target.textContent}`)[0]];

        e.preventDefault();
        yearInfo.textContent = `- ${e.target.textContent}`;
        this.updateCanvas('data', newData);
      }
    });

    window.addEventListener('resize', () => this.updateCanvas('width', this.root.clientWidth));

    window.addEventListener('click', e => {
      if(!e.target.closest('.widget-site-views .btn-show-years-list')) {
        yearsList.classList.remove('show-years-list');
      }
    });

    this.addWidgetHeaderListener();
  }
}

export default SiteViews;
