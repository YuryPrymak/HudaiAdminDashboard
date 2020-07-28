import Widget from './Widget';

class CanvasWidget extends Widget {
  constructor(title) {
    super(title);
  }

  getCookie(name) {
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  checkTheme() {
    const cookieValue = this.getCookie('colorTheme');

    const darkTheme = {
      bgColor: '#282a31',
      gridColor: '#33353b',

      barGraphBgColor: '#202126',
      linearDiagramDotColor: '#fff',
    };

    const lightTheme = {
      bgColor: '#fff',
      gridColor: '#e1e2e3',

      barGraphBgColor: '#787F91',
      linearDiagramDotColor: '#f0134d',
    };

    if(cookieValue === 'dark') {
      return darkTheme;
    } else if(cookieValue === 'light') {
      return lightTheme;
    }
  }

  themeToggle() {
    this.theme = this.checkTheme();
    this.canvasInitDrawing();
  }

  addWidgetThemeListener() {
    const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');

    btnThemesToggle.addEventListener('click', this.themeToggle.bind(this));
  }

  getCanvas(canvasClassName) {
    const canvas = document.createElement('canvas');
    canvas.classList.add(canvasClassName);
    return canvas;
  }

  updateCanvas(prop, value) {
    this[prop] = value;

    this.canvasInitDrawing();
  }

  clearCanvas() {
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  setStyles() {
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.canvas.style.backgroundColor = this.theme.bgColor;
  }

  canvasInitValues(canvasClassName) {
    this.canvas = document.querySelector(`.${canvasClassName}`);
    this.ctx = this.canvas.getContext('2d');
    this.theme = this.checkTheme();
  }
}

export default CanvasWidget;
