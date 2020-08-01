import CanvasWidget from '../CanvasWidget';

class RadarChart extends CanvasWidget {
  constructor(title, { data, width, height, chartRadius }) {
    super(title);

    this.data = data;
    this.canvas = null;
    this.ctx = null;
    this.width = width;
    this.height = height;
    this.chartRadius = chartRadius;
    this.theme = null;

    this.tech = ['Html', 'Css', 'Js', 'Node', 'Data'];
  }

  canvasInitDrawing() {
    this.setStyles();
    this.clearCanvas();

    this.drawSections();
    this.drawGrid();
    this.drawText();
    this.drawChart();
  }

  degToRad(deg) {
    return (deg * Math.PI) / 180; // Convert degrees to radians
  }

  sectorInRadians() {
    return this.degToRad(360 / this.tech.length);
  }

  getX(radius, radian) {
    return this.width / 2 + radius * Math.cos(radian - this.degToRad(90));
  }

  getY(radius, radian) {
    return this.height / 2 + radius * Math.sin(radian - this.degToRad(90));
  }

  drawSections() {
    this.ctx.strokeStyle = this.theme.gridColor;
    this.ctx.lineWidth = '2';

    for(let i = 0; i < this.tech.length; i++) {
      this.ctx.moveTo(this.width / 2, this.height / 2);
      const x = this.getX(this.chartRadius, i * this.sectorInRadians());
      const y = this.getY(this.chartRadius, i * this.sectorInRadians());
      this.ctx.lineTo(x, y);
    }

    this.ctx.stroke();
  }

  drawGrid() {
    const gridParts = 5;

    const getGridX = function(i, j) {
      const radius = this.chartRadius - ((this.chartRadius / gridParts) * i);
      return this.getX(radius, j * this.sectorInRadians());
    };

    const getGridY = function(i, j) {
      const radius = this.chartRadius - ((this.chartRadius / gridParts) * i);
      return this.getY(radius, j * this.sectorInRadians());
    };

    this.ctx.strokeStyle = this.theme.gridColor;
    this.ctx.lineWidth = '2';

    for(let i = 0; i < gridParts; i++) {
      for(let j = 0; j <= this.tech.length; j++) {
        if(j === 0) {
          this.ctx.moveTo(getGridX.call(this, i, j), getGridY.call(this, i, j));
        }
        this.ctx.lineTo(getGridX.call(this, i, j), getGridY.call(this, i, j));
      }
    }

    this.ctx.stroke();
  }

  drawText() {
    this.ctx.fillStyle = '#8f9094';
    this.ctx.font = 'normal 12px sans-serif';
    this.ctx.textBaseline = 'middle';

    this.tech.forEach((text, i) => {
      const xCondition = this.getX(this.chartRadius, i * this.sectorInRadians());
      const x = this.getX(this.chartRadius + 10, i * this.sectorInRadians());
      const y = this.getY(this.chartRadius + 10, i * this.sectorInRadians());

      if(xCondition === this.width / 2) {
        this.ctx.textAlign = 'center';
      } else if(xCondition < this.width / 2) {
        this.ctx.textAlign = 'right';
      } else if(xCondition > this.width / 2) {
        this.ctx.textAlign = 'left';
      }

      this.ctx.fillText(text, x, y);
    });
  }

  drawChart() {
    for(const el of this.data) {
      const grad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
      this.ctx.beginPath();
      grad.addColorStop(0, el.color);
      grad.addColorStop(1, `${el.color}99`);
      this.ctx.strokeStyle = '#ffffff00';
      this.ctx.fillStyle = grad;

      for(let i = 0; i < this.tech.length; i++) {
        const valInRatio = (this.chartRadius / 100) * el.values[i];
        const x = this.getX(valInRatio, i * this.sectorInRadians());
        const y = this.getY(valInRatio, i * this.sectorInRadians());

        if(i === 0) {
          this.ctx.moveTo(x, y);
        }

        this.ctx.lineTo(x, y);
      }

      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}

export default RadarChart;
