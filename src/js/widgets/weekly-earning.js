export default (() => {
  const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');
  const weeklyEarning = document.querySelector('.widget-weekly-earning');
  const canvas = document.querySelector('.widgets .weekly-earning');
  const c = canvas.getContext('2d');

  const darkTheme = {
    bgColor: '#282a31',
    gridColor: '#33353b',
    chartBg: '#202126',
  };

  const lightTheme = {
    bgColor: '#fff',
    gridColor: '#e1e2e3',
    chartBg: '#787f91',
  };

  let defaultTheme = darkTheme;

  let width = 310;
  const height = 160;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.backgroundColor = defaultTheme.bgColor;

  const data = [
    {
      day: 'MON',
      value: 335,
    },
    {
      day: 'TUE',
      value: 77,
    },
    {
      day: 'WED',
      value: 195,
    },
    {
      day: 'THU',
      value: 570,
    },
    {
      day: 'FRI',
      value: 223,
    },
    {
      day: 'SAT',
      value: 180,
    },
    {
      day: 'SUN',
      value: 65,
    },
  ];

  const valueStep = 200;

  const paddingTop = 15;
  const paddingBottom = 35;

  const bgWidthLeft = 40;

  let highestValue = null;

  let rowStep = null;
  let colStep = null;

  data.map(el => {
    if(el.value > highestValue) {
      highestValue = el.value;
    }
  });

  const drawGrid = function({ gridColor, bgColor }) {
    c.beginPath();
    c.strokeStyle = gridColor;
    c.lineWidth = '1';
    c.setLineDash([2, 2]);

    // Drawing rows
    for(let i = 0; i < parseInt(highestValue / valueStep + 2, 10); i++) {
      c.moveTo(0, rowStep * i + paddingTop);
      c.lineTo(width, rowStep * i + paddingTop);
      c.stroke();
    }

    // Drawing bg paddings
    const drawBg = function(xStart, yStart, xEnd, yEnd) {
      c.fillStyle = bgColor;
      c.fillRect(xStart, yStart, xEnd, yEnd);
    };

    drawBg(0, 0, bgWidthLeft, height);
    c.closePath();
  };

  const drawText = function() {
    c.beginPath();
    c.fillStyle = '#8f9094';
    c.textAlign = 'start';
    c.font = 'normal 12px sans-serif';

    // Days (axis X)
    data.forEach((el, i) => {
      c.fillText(el.day, colStep * (i + 1) + (bgWidthLeft - colStep + 10), height - 15);
    });

    // Values (axis Y)
    c.textAlign = 'end';
    for(let i = 0; i < parseInt(highestValue / valueStep + 2, 10); i++) {
      c.fillText(valueStep * i, bgWidthLeft - 5, height - rowStep * (i + 1) - (paddingBottom - rowStep - 2));
    }
    c.closePath();
  };

  const drawBarChart = function({ chartBg }) {
    c.beginPath();
    c.save();

    for(let i = 0; i < data.length; i++) {
      const valInRatio = height - parseInt((data[i].value / valueStep) * rowStep, 10) - paddingBottom;

      c.lineWidth = '15';
      c.strokeStyle = chartBg;
      c.setLineDash([0]);
      c.shadowOffsetX = 2;
      c.shadowOffsetY = 3;
      c.shadowBlur = 3;
      c.shadowColor = chartBg;

      c.moveTo(colStep * i + bgWidthLeft + 20, height - paddingBottom);
      c.lineTo(colStep * i + bgWidthLeft + 20, valInRatio);
    }

    c.stroke();
    c.restore();
    c.closePath();
  };

  const clearCanvas = function() {
    c.beginPath();
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.closePath();
  };

  const initDrawing = function(theme) {
    clearCanvas();
    drawGrid(theme);
    drawText();
    drawBarChart(theme);
  };

  const calcValues = function() {
    width = weeklyEarning.clientWidth;
    canvas.setAttribute('width', width);
    canvas.style.width = `${width}px`;

    rowStep = parseInt(parseInt(height - (paddingTop + paddingBottom), 10) / (parseInt(highestValue / valueStep + 1, 10)), 10);
    colStep = parseInt((width - bgWidthLeft) / (data.length), 10);
  };

  calcValues();
  initDrawing(defaultTheme);

  btnThemesToggle.addEventListener('click', () => {
    defaultTheme === darkTheme ? defaultTheme = lightTheme : defaultTheme = darkTheme;
    canvas.style.backgroundColor = defaultTheme.bgColor;
    initDrawing(defaultTheme);
  });

  window.addEventListener('resize', () => {
    calcValues();
    initDrawing(defaultTheme);
  });
})();
