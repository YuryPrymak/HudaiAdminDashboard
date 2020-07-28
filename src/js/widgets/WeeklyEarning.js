import BarGraph from './charts/BarGraph';

class WeeklyEarning extends BarGraph {
  constructor(emitter, title, rootSelector, data) {
    super(title, {
      data,
      width: document.querySelector(rootSelector).clientWidth,
      height: 160,
      valueStep: 200,
    });

    this.emitter = emitter;

    this.rootSelector = rootSelector;
    this.root = document.querySelector(this.rootSelector);
    this.canvasClassName = 'weekly-earning';

    this.render();
    this.addListeners();
  }

  render() {
    this.root.append(this.getHeaderTemplate());
    this.root.append(this.getCanvas(this.canvasClassName));
    this.canvasInitValues(this.canvasClassName);
    this.canvasInitDrawing();
  }

  addListeners() {
    const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');

    btnThemesToggle.addEventListener('click', this.themeToggle.bind(this));
    window.addEventListener('resize', () => this.updateCanvas('width', this.root.clientWidth));

    this.addWidgetHeaderListener();
    this.addBtnOptionsEmitter();
  }
}

export default WeeklyEarning;
