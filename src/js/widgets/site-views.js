export default (() => {
  const btnNavMinimizeToggle = document.querySelector('.header .btn-nav-toggle');
  const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');
  const siteViews = document.querySelector('.widget-site-views');
  const btnShowYearsList = document.querySelector('.widget-site-views .btn-show-years-list');
  const yearsList = document.querySelector('.widget-site-views .years-list');
  const yearDisplay = document.querySelector('.widget-site-views .year');

  const darkTheme = {
    bgColor: '#282a31',
    gridColor: '#33353b',
    dotColor: '#fff',
  };

  const lightTheme = {
    bgColor: '#fff',
    gridColor: '#e1e2e3',
    dotColor: '#f0134d',
  };

  let defaultTheme = darkTheme;

  const canvas = document.querySelector('.widgets .site-views');
  const c = canvas.getContext('2d');
  let width = 640;
  const height = 390;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const { PI } = Math;

  const data = {
    data2018: [
      {
        month: 1,
        day: 9,
        value: 75,
      },
      {
        month: 1,
        day: 29,
        value: 127,
      },
      {
        month: 2,
        day: 17,
        value: 100,
      },
      {
        month: 3,
        day: 20,
        value: 143,
      },
      {
        month: 4,
        day: 8,
        value: 117,
      },
      {
        month: 4,
        day: 30,
        value: 160,
      },
      {
        month: 5,
        day: 19,
        value: 123,
      },
      {
        month: 6,
        day: 14,
        value: 140,
      },
      {
        month: 7,
        day: 2,
        value: 119,
      },
      {
        month: 7,
        day: 24,
        value: 174,
      },
      {
        month: 8,
        day: 19,
        value: 103,
      },
      {
        month: 9,
        day: 21,
        value: 110,
      },
      {
        month: 10,
        day: 12,
        value: 83,
      },
      {
        month: 11,
        day: 7,
        value: 103,
      },
      {
        month: 12,
        day: 18,
        value: 75,
      },
    ],

    data2019: [
      {
        month: 1,
        day: 1,
        value: 50,
      },
      {
        month: 2,
        day: 2,
        value: 100,
      },
      {
        month: 2,
        day: 17,
        value: 73,
      },
      {
        month: 3,
        day: 20,
        value: 148,
      },
      {
        month: 4,
        day: 16,
        value: 90,
      },
      {
        month: 5,
        day: 23,
        value: 140,
      },
      {
        month: 6,
        day: 3,
        value: 117,
      },
      {
        month: 7,
        day: 9,
        value: 155,
      },
      {
        month: 8,
        day: 11,
        value: 99,
      },
      {
        month: 9,
        day: 13,
        value: 223,
      },
      {
        month: 10,
        day: 17,
        value: 137,
      },
      {
        month: 11,
        day: 14,
        value: 267,
      },
    ],
  };

  let defaultDataYear = 2019;

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const bgCoordinates = [];

  const valueStep = 50;

  const paddingTop = 20;
  const paddingBottom = 60;
  const paddingLeft = 70;
  const paddingRight = 10;

  const bgHeightTop = 10;
  const bgHeightBottom = 35;
  const bgWidthLeft = 50;
  const bgWidthRight = 0;

  let highestValue = 0;

  let rowStep = null;
  let colStep = null;

  const getDataValInRatio = function(value) {
    return height - parseInt((value / valueStep) * rowStep, 10) - paddingBottom;
  };

  const getDataDayInRatio = function(month, day) {
    return parseInt(colStep * month, 10) + paddingLeft - colStep + parseInt((colStep / 30) * day, 10);
  };

  const getCookie = function(name) {
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const checkTheme = function() {
    const cookieValue = getCookie('colorTheme');

    if(cookieValue === 'dark') {
      defaultTheme = darkTheme;
    } else if(cookieValue === 'light') {
      defaultTheme = lightTheme;
    }

    canvas.style.backgroundColor = defaultTheme.bgColor;
  };

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

    // Drawing columns
    for(let i = 0; i < months.length + 1; i++) {
      c.moveTo(colStep * i + paddingLeft, 0);
      c.lineTo(colStep * i + paddingLeft, height);
      c.stroke();
    }

    // Drawing bg paddings
    const drawBg = function(xStart, yStart, xEnd, yEnd) {
      c.fillStyle = bgColor;
      c.fillRect(xStart, yStart, xEnd, yEnd);
    };

    drawBg(0, 0, width, bgHeightTop);
    drawBg(0, height - bgHeightBottom, width, height);
    drawBg(0, 0, bgWidthLeft, height);
    drawBg(width - bgWidthRight, 0, width, height);
    c.closePath();
  };

  const drawText = function() {
    c.beginPath();
    c.fillStyle = '#8f9094';
    c.textAlign = 'start';
    c.font = 'normal 12px sans-serif';

    // Months (axis X)
    months.forEach((el, i) => {
      c.fillText(el, colStep * (i + 1) + (paddingLeft - colStep - 12), height - bgHeightBottom + 15);
    });

    // Values (axis Y)
    c.textAlign = 'end';
    for(let i = 0; i < parseInt(highestValue / valueStep + 2, 10); i++) {
      c.fillText(`${valueStep * i}K`, bgWidthLeft - 5, height - rowStep * (i + 1) - (paddingBottom - rowStep));
    }
    c.closePath();
  };

  const drawDiagram = function(currentData) {
    c.beginPath();
    const grad = c.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c1255d');
    grad.addColorStop(0.5, '#3a69b5');
    grad.addColorStop(1, '#27c0a7');
    c.setLineDash([]);
    c.strokeStyle = grad;
    c.lineWidth = '3';

    for(let i = 0; i < currentData.length; i++) {
      const valInRatio = getDataValInRatio(currentData[i].value);
      const dayInRatio = getDataDayInRatio(currentData[i].month, currentData[i].day);

      if(i === 0) {
        c.moveTo(dayInRatio, valInRatio);
        bgCoordinates.push({
          x: dayInRatio,
          y: valInRatio,
        });
      } else {
        c.lineTo(dayInRatio, valInRatio);
        bgCoordinates.push({
          x: dayInRatio,
          y: valInRatio,
        });
      }
    }

    c.stroke();
    c.closePath();
  };

  const drawBg = function() {
    const bottomPointY = parseInt(highestValue / valueStep + 1, 10) * rowStep + paddingTop;
    const gradBg = c.createLinearGradient(300, 0, 300, 300);

    c.beginPath();
    c.moveTo(bgCoordinates[0].x, bgCoordinates[0].y);
    for(let i = 1; i < bgCoordinates.length; i++) {
      c.lineTo(bgCoordinates[i].x, bgCoordinates[i].y);
    }
    c.lineTo(bgCoordinates[bgCoordinates.length - 1].x, bottomPointY);
    c.lineTo(bgCoordinates[0].x, bottomPointY);
    gradBg.addColorStop(0, '#6fe7dd99');
    gradBg.addColorStop(0.6, '#2e36cf99');
    gradBg.addColorStop(1, '#6639a60d');
    c.fillStyle = gradBg;
    c.fill();
    c.strokeStyle = 'transparent';
    c.stroke();
    c.closePath();
  };

  const drawDots = function(currentData, { dotColor }) {
    const draw = function(x, y) {
      c.beginPath();
      c.strokeStyle = '#28dcbc';
      c.arc(x, y, 7, 0, PI * 2, false);
      c.stroke();
      c.closePath();

      c.beginPath();
      c.strokeStyle = dotColor;
      c.fillStyle = dotColor;
      c.arc(x, y, 2, 0, PI * 2, false);
      c.fill();
      c.stroke();
      c.closePath();
    };

    for(let i = 0; i < currentData.length; i++) {
      const valInRatio = getDataValInRatio(currentData[i].value);
      const dayInRatio = getDataDayInRatio(currentData[i].month, currentData[i].day);

      if(i !== 0 && i < currentData.length - 1) {
        if(currentData[i - 1].value < currentData[i].value && currentData[i].value > currentData[i + 1].value) {
          draw(dayInRatio, valInRatio);
        }
      }

      if(i === 0 && currentData[0].value > currentData[1].value) {
        draw(dayInRatio, valInRatio);
      }

      if(i === currentData.length - 1 && currentData[i].value > currentData[i - 1].value) {
        draw(dayInRatio, valInRatio);
      }
    }
  };

  const clearCanvas = function() {
    bgCoordinates.length = 0;
    c.beginPath();
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.closePath();
  };

  const initDrawing = function(year, theme) {
    clearCanvas();
    drawGrid(theme);
    drawText();
    drawDiagram(data[`data${year}`]);
    drawBg();
    drawDots(data[`data${year}`], theme);
  };

  const calcValues = function(year) {
    width = siteViews.clientWidth;
    canvas.setAttribute('width', width);
    canvas.style.width = `${width}px`;
    highestValue = 0;

    data[`data${year}`].map(el => {
      if(el.value > highestValue) {
        highestValue = el.value;
      }
    });

    rowStep = parseInt(parseInt(height - (paddingTop + paddingBottom), 10) / (parseInt(highestValue / valueStep + 1, 10)), 10);
    colStep = parseInt((width - (paddingLeft + paddingRight)) / (months.length), 10);
  };

  const redrawMonthNames = function({ bgColor }) {
    // Drawing bg paddings
    c.beginPath();
    const drawBottomBg = function(xStart, yStart, xEnd, yEnd) {
      c.fillStyle = bgColor;
      c.fillRect(xStart, yStart, xEnd, yEnd);
    };
    drawBottomBg(0, height - bgHeightBottom, width, height);

    // Drawing months names (axis X)
    c.fillStyle = '#8f9094';
    c.textAlign = 'start';
    c.font = 'normal 12px sans-serif';
    months.forEach((el, i) => {
      if(i % 2 === 0) {
        c.fillText(el, colStep * (i + 1) + (paddingLeft - colStep - 12), height - bgHeightBottom + 15);
      }
    });
    c.closePath();
  };

  checkTheme();
  calcValues(defaultDataYear);
  initDrawing(defaultDataYear, defaultTheme);
  if(window.innerWidth <= 500) {
    redrawMonthNames(defaultTheme); // draw half of months for responsiveness
  }

  btnNavMinimizeToggle.addEventListener('click', () => {
    calcValues(defaultDataYear);
    initDrawing(defaultDataYear, defaultTheme);
  });

  btnShowYearsList.addEventListener('click', () => {
    yearsList.classList.toggle('show-years-list');
  });

  yearsList.addEventListener('click', e => {
    if(e.target.nodeName === 'A') {
      e.preventDefault();
      yearDisplay.textContent = e.target.textContent;
      defaultDataYear = parseInt(e.target.textContent, 10);
      calcValues(defaultDataYear);
      initDrawing(defaultDataYear, defaultTheme);
    }
  });

  btnThemesToggle.addEventListener('click', () => {
    defaultTheme === darkTheme ? defaultTheme = lightTheme : defaultTheme = darkTheme;
    canvas.style.backgroundColor = defaultTheme.bgColor;
    initDrawing(defaultDataYear, defaultTheme);
    if(window.innerWidth <= 500) {
      redrawMonthNames(defaultTheme);
    }
  });

  window.addEventListener('click', e => {
    if(!e.target.closest('.widget-site-views .btn-show-years-list')) {
      yearsList.classList.remove('show-years-list');
    }
  });

  window.addEventListener('resize', () => {
    calcValues(defaultDataYear);
    initDrawing(defaultDataYear, defaultTheme);

    if(window.innerWidth <= 500) {
      redrawMonthNames(defaultTheme); // draw half of months for responsiveness
    }
  });
})();
