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
    this.canvasClassName = 'bar-graph';

    this.render();
    this.addListeners();
  }

  render() {
    this.root.append(this.getHeaderTemplate());
    this.root.append(this.getCanvas(this.canvasClassName));
    this.canvasInitValues(this.canvasClassName);
    this.canvasInitDrawing();

    this.updateGraphColWidth();
  }

  addListeners() {
    window.addEventListener('resize', () => {
      this.updateCanvas('width', this.root.clientWidth);
      this.updateGraphColWidth();
    });

    this.addWidgetHeaderListener();
    this.addWidgetThemeListener();
    this.addBtnOptionsEmitter();
  }

  updateGraphColWidth() {
    if(window.innerWidth <= 768 && window.innerWidth >= 550) {
      this.updateCanvas('graphColWidth', 30);
    } else {
      this.updateCanvas('graphColWidth', 15);
    }
  }
}

export default WeeklyEarning;
