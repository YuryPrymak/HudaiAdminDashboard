import DonutChart from './charts/DonutChart';

class EarnByCountry extends DonutChart {
  constructor(emitter, title, data, rootSelector) {
    super(title, {
      data,
      diameter: 120,
    });

    this.emitter = emitter;

    this.data = data;
    this.rootSelector = rootSelector;
    this.root = document.querySelector(this.rootSelector);
    this.canvasClassName = 'earn-by-country';

    this.render();
    this.addListeners();
  }

  render() {
    const wrapper = this.getWrapperTemplate();

    this.root.append(this.getHeaderTemplate());
    this.root.append(wrapper);
    wrapper.append(this.getCanvas(this.canvasClassName));
    wrapper.append(this.getInfoTemplate());
    this.canvasInitValues(this.canvasClassName);
    this.canvasInitDrawing();
  }

  getWrapperTemplate() {
    const template = document.createElement('div');

    template.classList.add('donut-chart');

    return template;
  }

  getInfoTemplate() {
    const root = document.createElement('ul');

    const getInfoItem = info => {
      const getInfo = ({ country, value, color }) => `
        <li>
          <span class="dot" style="background-color: ${color};"></span>
          <p class="country">${country}</p>
          <p class="value">- ${value}%</p>
        </li>
      `;

      const template = info.map(stats => getInfo(stats)).join('');

      return template;
    };

    root.classList.add('info');
    root.insertAdjacentHTML('afterbegin', getInfoItem(this.data));

    return root;
  }

  addListeners() {
    const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');

    btnThemesToggle.addEventListener('click', this.themeToggle.bind(this));

    this.addWidgetHeaderListener();
    this.addBtnOptionsEmitter();
  }
}

export default EarnByCountry;
