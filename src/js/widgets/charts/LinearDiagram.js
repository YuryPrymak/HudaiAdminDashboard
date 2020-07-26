import CanvasWidget from '../CanvasWidget';

class LinearDiagram extends CanvasWidget {
  constructor(title, { data, width, height, valueStep }) {
    super(title);

    this.data = data;
    this.canvas = null;
    this.ctx = null;
    this.width = width;
    this.height = height;
    this.valueStep = valueStep;
    this.theme = null;

    this.months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    this.gridPaddings = {
      top: 20, // first row line start
      bottom: 60, // last row line end
      left: 70, // first col line start
      right: 10, // last col line end
    };

    this.fillPaddings = {
      top: 10,
      bottom: 35,
      left: 50,
      right: 0,
    };

    this.highestValue = null;
    this.bgCoordinates = [];
    this.rowStep = null;
    this.colStep = null;

    this.PI = Math.PI;
  }

  canvasInitDrawing() {
    this.setStyles();
    this.calcDataHighestValue();
    this.calcGridSteps();
    this.clearCanvas();

    this.drawGrid();
    this.drawText();
    this.drawChart();
    this.drawBg();
    this.drawDots();

    if(window.innerWidth <= 500) {
      this.redrawMonthNames(); // draw half of months for responsiveness
    }
  }

  calcDataHighestValue() {
    this.highestValue = 0;

    this.data.forEach(val => {
      if(val.value > this.highestValue) {
        this.highestValue = val.value;
      }
    });
  }

  calcGridSteps() {
    // Calc row step
    const rowsHeight = this.height - this.gridPaddings.top - this.gridPaddings.bottom;
    const quantityLines = parseInt(this.highestValue / this.valueStep + 1, 10);
    this.rowStep = rowsHeight / quantityLines;

    // Calc col step
    const colsWidth = this.width - this.gridPaddings.left - this.gridPaddings.right;
    this.colStep = parseInt(colsWidth / this.months.length, 10);
  }

  getDataValInRatio(value) {
    return this.height - parseInt((value / this.valueStep) * this.rowStep, 10) - this.gridPaddings.bottom;
  }

  getDataDayInRatio(month, day) {
    return this.colStep * month + this.gridPaddings.left - this.colStep + parseInt((this.colStep / 30) * day, 10);
  }

  redrawMonthNames() {
    // Drawing fill padding bottom
    const drawBottomBg = function(xStart, yStart, xEnd, yEnd) {
      this.ctx.fillStyle = this.theme.bgColor;
      this.ctx.fillRect(xStart, yStart, xEnd, yEnd);
    };
    drawBottomBg.call(this, 0, this.height - this.fillPaddings.bottom, this.width, this.height);

    // Drawing months (axis X)
    this.ctx.fillStyle = '#8f9094';
    this.ctx.textAlign = 'start';
    this.months.forEach((el, i) => {
      if(i % 2 === 0) {
        const x = this.colStep * (i + 1) + (this.gridPaddings.left - this.colStep - 12);
        const y = this.height - this.fillPaddings.bottom + 15;
        this.ctx.fillText(el, x, y);
      }
    });
  }

  clearCanvas() {
    this.bgCoordinates.length = 0;
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawGrid() {
    this.ctx.strokeStyle = this.theme.gridColor;
    this.ctx.lineWidth = '1';
    this.ctx.setLineDash([2, 2]);

    // Drawing rows
    const quantityLines = parseInt(this.highestValue / this.valueStep + 2, 10);
    for(let i = 0; i < quantityLines; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.rowStep * i + this.gridPaddings.top);
      this.ctx.lineTo(this.width, this.rowStep * i + this.gridPaddings.top);
      this.ctx.stroke();
    }

    // Drawing columns
    for(let i = 0; i < this.months.length + 1; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.colStep * i + this.gridPaddings.left, 0);
      this.ctx.lineTo(this.colStep * i + this.gridPaddings.left, this.height);
      this.ctx.stroke();
    }

    // Drawing fill paddings
    const drawFillPaddings = function(xStart, yStart, xEnd, yEnd) {
      this.ctx.fillStyle = this.theme.bgColor;
      this.ctx.fillRect(xStart, yStart, xEnd, yEnd);
    };

    drawFillPaddings.call(this, 0, 0, this.width, this.fillPaddings.top);
    drawFillPaddings.call(this, 0, this.height - this.fillPaddings.bottom, this.width, this.height);
    drawFillPaddings.call(this, 0, 0, this.fillPaddings.left, this.height);
    drawFillPaddings.call(this, this.width - this.fillPaddings.right, 0, this.width, this.height);
  }

  drawText() {
    this.ctx.fillStyle = '#8f9094';
    this.ctx.font = 'normal 12px sans-serif';

    // Months (axis X)
    this.months.forEach((monthName, i) => {
      const x = this.colStep * (i + 1) + (this.gridPaddings.left - this.colStep - 12);
      const y = this.height - this.fillPaddings.bottom + 15;
      this.ctx.fillText(monthName, x, y);
    });

    // Values (axis Y)
    const quantityLines = parseInt(this.highestValue / this.valueStep + 2, 10);
    this.ctx.textAlign = 'end';
    for(let i = 0; i < quantityLines; i++) {
      const x = this.fillPaddings.left - 5;
      const y = this.height - this.rowStep * (i + 1) - (this.gridPaddings.bottom - this.rowStep - 4);
      this.ctx.fillText(`${this.valueStep * i}K`, x, y);
    }
  }

  drawChart() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    this.ctx.beginPath();
    gradient.addColorStop(0, '#c1255d');
    gradient.addColorStop(0.5, '#3a69b5');
    gradient.addColorStop(1, '#27c0a7');
    this.ctx.setLineDash([]);
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = '3';

    for(let i = 0; i < this.data.length; i++) {
      const valInRatio = this.getDataValInRatio(this.data[i].value);
      const dayInRatio = this.getDataDayInRatio(this.data[i].month, this.data[i].day);

      if(i === 0) {
        this.ctx.moveTo(dayInRatio, valInRatio);
        this.bgCoordinates.push({
          x: dayInRatio,
          y: valInRatio,
        });
      } else {
        this.ctx.lineTo(dayInRatio, valInRatio);
        this.bgCoordinates.push({
          x: dayInRatio,
          y: valInRatio,
        });
      }
    }

    this.ctx.stroke();
  }

  drawBg() {
    const bottomPointY = parseInt(this.highestValue / this.valueStep + 1, 10) * this.rowStep + this.gridPaddings.top;
    const gradBg = this.ctx.createLinearGradient(300, 0, 300, 300);

    this.ctx.beginPath();
    this.ctx.moveTo(this.bgCoordinates[0].x, this.bgCoordinates[0].y);

    for(let i = 1; i < this.bgCoordinates.length; i++) {
      this.ctx.lineTo(this.bgCoordinates[i].x, this.bgCoordinates[i].y);
    }

    this.ctx.lineTo(this.bgCoordinates[this.bgCoordinates.length - 1].x, bottomPointY);
    this.ctx.lineTo(this.bgCoordinates[0].x, bottomPointY);

    gradBg.addColorStop(0, '#6fe7dd99');
    gradBg.addColorStop(0.6, '#2e36cf99');
    gradBg.addColorStop(1, '#6639a60d');
    this.ctx.fillStyle = gradBg;
    this.ctx.fill();
    this.ctx.strokeStyle = 'transparent';
    this.ctx.stroke();
  }

  drawDots() {
    const drawDot = function(PI, x, y) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#28dcbc';
      this.ctx.arc(x, y, 7, 0, PI * 2, false);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.strokeStyle = this.theme.linearDiagramDotColor;
      this.ctx.fillStyle = this.theme.linearDiagramDotColor;
      this.ctx.arc(x, y, 2, 0, PI * 2, false);
      this.ctx.fill();
      this.ctx.stroke();
    };

    for(let i = 0; i < this.data.length; i++) {
      const valInRatio = this.getDataValInRatio(this.data[i].value);
      const dayInRatio = this.getDataDayInRatio(this.data[i].month, this.data[i].day);

      if(i !== 0 && i < this.data.length - 1) {
        if(this.data[i - 1].value < this.data[i].value && this.data[i].value > this.data[i + 1].value) {
          drawDot.call(this, this.PI, dayInRatio, valInRatio);
        }
      }

      if(i === 0 && this.data[0].value > this.data[1].value) {
        drawDot.call(this, this.PI, dayInRatio, valInRatio);
      }

      if(i === this.data.length - 1 && this.data[i].value > this.data[i - 1].value) {
        drawDot.call(this, this.PI, dayInRatio, valInRatio);
      }
    }
  }
}

export default LinearDiagram;
