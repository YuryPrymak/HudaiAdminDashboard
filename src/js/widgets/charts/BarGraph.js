import CanvasWidget from '../CanvasWidget';

class BarGraph extends CanvasWidget {
  constructor(title, { data, width, height, valueStep }) {
    super(title);

    this.data = data;
    this.canvas = null;
    this.ctx = null;
    this.width = width;
    this.height = height;
    this.valueStep = valueStep;
    this.theme = null;
    this.rowStep = null;
    this.colStep = null;
    this.highestValue = null;
    this.daysOfTheWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    this.gridPaddings = {
      top: 15, // first row line start
      bottom: 35, // last row line end
    };

    this.fillPaddings = {
      left: 40,
    };
  }

  canvasInitDrawing() {
    this.setStyles();
    this.calcDataHighestValue();
    this.calcGridSteps();
    this.clearCanvas();

    this.drawGrid();
    this.drawText();
    this.drawBarGraph();
  }

  calcDataHighestValue() {
    this.highestValue = 0;

    this.data.forEach(val => {
      if(val > this.highestValue) {
        this.highestValue = val;
      }
    });
  }

  calcGridSteps() {
    // Calc row step
    const rowsHeight = this.height - this.gridPaddings.top - this.gridPaddings.bottom;
    const quantityLines = parseInt(this.highestValue / this.valueStep + 1, 10);
    this.rowStep = rowsHeight / quantityLines;

    // Calc col step
    const colsWidth = this.width - this.fillPaddings.left;
    this.colStep = parseInt(colsWidth / this.daysOfTheWeek.length, 10);
  }

  drawGrid() {
    this.ctx.strokeStyle = this.theme.gridColor;
    this.ctx.lineWidth = '1';
    this.ctx.setLineDash([2, 2]);

    // Drawing rows
    for(let i = 0; i < parseInt(this.highestValue / this.valueStep + 2, 10); i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.rowStep * i + this.gridPaddings.top);
      this.ctx.lineTo(this.width, this.rowStep * i + this.gridPaddings.top);
      this.ctx.stroke();
    }

    // Drawing fill paddings
    const drawFillPaddings = function(xStart, yStart, xEnd, yEnd) {
      this.ctx.fillStyle = this.theme.bgColor;
      this.ctx.fillRect(xStart, yStart, xEnd, yEnd);
    };

    drawFillPaddings.call(this, 0, 0, this.fillPaddings.left, this.height);
  }

  drawText() {
    this.ctx.fillStyle = '#8f9094';
    this.ctx.textAlign = 'start';
    this.ctx.font = 'normal 12px sans-serif';

    // Days (axis X)
    this.daysOfTheWeek.forEach((day, i) => {
      const x = this.colStep * (i + 1) + (this.fillPaddings.left - this.colStep + 10);
      const y = this.height - 15;
      this.ctx.fillText(day, x, y);
    });

    // Values (axis Y)
    this.ctx.textAlign = 'end';
    for(let i = 0; i < parseInt(this.highestValue / this.valueStep + 2, 10); i++) {
      const x = this.fillPaddings.left - 5;
      const y = this.height - this.rowStep * (i + 1) - (this.gridPaddings.bottom - this.rowStep - 4);
      this.ctx.fillText(this.valueStep * i, x, y);
    }
  }

  drawBarGraph() {
    this.ctx.beginPath();

    for(let i = 0; i < this.data.length; i++) {
      const valueInPixels = parseInt((this.data[i] / this.valueStep) * this.rowStep, 10);
      const valInRatio = this.height - valueInPixels - this.gridPaddings.bottom;

      this.ctx.lineWidth = '15';
      this.ctx.strokeStyle = this.theme.barGraphBgColor;
      this.ctx.setLineDash([0]);
      this.ctx.shadowOffsetX = 2;
      this.ctx.shadowOffsetY = 3;
      this.ctx.shadowBlur = 3;
      this.ctx.shadowColor = this.theme.barGraphBgColor;

      this.ctx.moveTo(this.colStep * i + this.fillPaddings.left + 20, this.height - this.gridPaddings.bottom);
      this.ctx.lineTo(this.colStep * i + this.fillPaddings.left + 20, valInRatio);
    }

    this.ctx.stroke();
  }
}

export default BarGraph;
