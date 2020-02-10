export default (() => {
  const btnOptions = document.querySelector('.widget-weekly-earning .btn-options');
  const optionsList = document.querySelector('.widget-weekly-earning .options-list');

  const canvas = document.querySelector('.widgets .weekly-earning');
  const c = canvas.getContext('2d');
  const width = 300;
  const height = 160;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.backgroundColor = '#282a31';

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

  const bgWidthLeft = 30;

  let highestValue = 0;

  let rowStep = null;
  const colStep = parseInt((width - bgWidthLeft) / (data.length), 10);

  const drawGrid = function() {
    c.beginPath();
    c.strokeStyle = '#33353b';
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
      c.fillStyle = '#282a31';
      c.fillRect(xStart, yStart, xEnd, yEnd);
    };

    drawBg(0, 0, bgWidthLeft, height);
    c.closePath();
  };

  const drawText = function() {
    c.beginPath();
    c.fillStyle = '#8f9094';
    c.textAlign = 'start';

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

  const drawBarChart = function() {
    c.beginPath();

    for(let i = 0; i < data.length; i++) {
      const valInRatio = height - parseInt((data[i].value / valueStep) * rowStep, 10) - paddingBottom;
      c.lineWidth = '15';
      c.strokeStyle = '#202126';
      c.setLineDash([0]);
      c.shadowOffsetX = 2;
      c.shadowOffsetY = 3;
      c.shadowBlur = 3;
      c.shadowColor = '#101114';

      c.moveTo(colStep * i + bgWidthLeft + 20, height - paddingBottom);
      c.lineTo(colStep * i + bgWidthLeft + 20, valInRatio);
    }

    c.stroke();
    c.closePath();
  };

  const clearCanvas = function() {
    c.beginPath();
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.closePath();
  };

  const initDrawing = function() {
    highestValue = 0;

    data.map(el => {
      if(el.value > highestValue) {
        highestValue = el.value;
      }
    });

    rowStep = parseInt(parseInt(height - (paddingTop + paddingBottom), 10) / (parseInt(highestValue / valueStep + 1, 10)), 10);

    clearCanvas();
    drawGrid();
    drawText();
    drawBarChart();
  };

  initDrawing();

  btnOptions.addEventListener('click', () => {
    optionsList.classList.toggle('show-options');
  });
})();
