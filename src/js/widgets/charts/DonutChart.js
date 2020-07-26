import CanvasWidget from '../CanvasWidget';

class DonutChart extends CanvasWidget {
  constructor(title, { data, diameter }) {
    super(title);

    this.data = data;
    this.canvas = null;
    this.ctx = null;
    this.width = diameter;
    this.height = diameter;
    this.diameter = diameter;
    this.theme = null;
    this.startPos = 1.5 * Math.PI; // top of circle
  }

  canvasInitDrawing() {
    this.setStyles();
    this.drawChart();
  }

  drawChart() {
    const drawPart = function(i) {
      const endValue = this.startPos + (Math.PI * 2) * (this.data[i].value / 100);

      this.ctx.beginPath();
      this.ctx.strokeStyle = this.data[i].color;
      this.ctx.lineWidth = 20;
      this.ctx.arc(this.diameter / 2, this.diameter / 2, this.diameter / 2 - 10, this.startPos, endValue);
      this.ctx.stroke();
      this.startPos = endValue;
    };

    this.data.forEach((el, i) => drawPart.call(this, i));
  }
}

export default DonutChart;
