export default (() => {
  const btnNavMinimizeToggle = document.querySelector('.header .btn-nav-toggle');
  const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');
  const radarChart = document.querySelector('.widget-radar-chart');
  const projectsList = document.querySelector('.widget-radar-chart .projects');

  const darkTheme = {
    bgColor: '#282a31',
    gridColor: '#33353b',
  };

  const lightTheme = {
    bgColor: '#fff',
    gridColor: '#e1e2e3',
  };

  let defaultTheme = darkTheme;

  const canvas = document.querySelector('.widgets .radar-chart');
  const c = canvas.getContext('2d');
  let width = null;
  const height = 350;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.backgroundColor = defaultTheme.bgColor;

  const { PI, sin, cos } = Math;

  let chartRadius = 130;

  const tech = ['Html', 'Css', 'Js', 'Node', 'Data'];

  const data = [
    {
      name: 'Main web app',
      values: [80, 73, 84, 61, 70],
      color: '#3490de',
    },
    {
      name: 'Mobile app',
      values: [93, 81, 64, 29, 59],
      color: '#f01a63',
    },
    {
      name: 'Landing',
      values: [81, 85, 64, 43, 37],
      color: '#6fe7dd',
    },
  ];

  const degToRad = function(deg) { // Convert degrees to radians
    return (deg * PI) / 180;
  };

  const sectorInRadians = degToRad(360 / tech.length);

  const getX = function(radius, radian) {
    return width / 2 + radius * cos(radian - degToRad(90));
  };

  const getY = function(radius, radian) {
    return height / 2 + radius * sin(radian - degToRad(90));
  };

  const getProjectTemplate = function(name, color) {
    return `
    <li>
      <a class="btn-choice-project">
        <span class="color-id" style="background-color: ${color};"></span>
        ${name}
      </a>
    </li>`;
  };

  const drawSections = function({ gridColor }) {
    c.beginPath();
    c.strokeStyle = gridColor;
    c.lineWidth = '2';

    for(let i = 0; i < tech.length; i++) {
      c.moveTo(width / 2, height / 2);
      c.lineTo(getX(chartRadius, i * sectorInRadians), getY(chartRadius, i * sectorInRadians));
    }

    c.stroke();
    c.closePath();
  };

  const drawGrid = function({ gridColor }) {
    const gridParts = 5;

    const getGridX = function(i, j) {
      const radius = chartRadius - ((chartRadius / gridParts) * i);
      return getX(radius, j * sectorInRadians);
    };

    const getGridY = function(i, j) {
      const radius = chartRadius - ((chartRadius / gridParts) * i);
      return getY(radius, j * sectorInRadians);
    };

    c.beginPath();
    c.strokeStyle = gridColor;
    c.lineWidth = '2';

    for(let i = 0; i < gridParts; i++) {
      for(let j = 0; j <= tech.length; j++) {
        if(j === 0) {
          c.moveTo(getGridX(i, j), getGridY(i, j));
        }
        c.lineTo(getGridX(i, j), getGridY(i, j));
      }
    }

    c.stroke();
    c.closePath();
  };

  const drawText = function() {
    c.beginPath();
    c.fillStyle = '#8f9094';
    c.font = 'normal 12px sans-serif';

    tech.forEach((text, i) => {
      c.textBaseline = 'middle';

      if(getX(chartRadius, i * sectorInRadians) === width / 2) {
        c.textAlign = 'center';
      } else if(getX(chartRadius, i * sectorInRadians) < width / 2) {
        c.textAlign = 'right';
      } else if(getX(chartRadius, i * sectorInRadians) > width / 2) {
        c.textAlign = 'left';
      }

      c.fillText(text, getX(chartRadius + 10, i * sectorInRadians), getY(chartRadius + 10, i * sectorInRadians));
    });

    c.closePath();
  };

  const drawChart = function(chartData) {
    for(const el of chartData) {
      const grad = c.createLinearGradient(0, 0, width, height);

      c.beginPath();
      grad.addColorStop(0, el.color);
      grad.addColorStop(1, `${el.color}99`);
      c.strokeStyle = '#ffffff00';
      c.fillStyle = grad;

      for(let i = 0; i < tech.length; i++) {
        const valInRatio = (chartRadius / 100) * el.values[i];
        if(i === 0) {
          c.moveTo(getX(valInRatio, i * sectorInRadians), getY(valInRatio, i * sectorInRadians));
        }
        c.lineTo(getX(valInRatio, i * sectorInRadians), getY(valInRatio, i * sectorInRadians));
      }

      c.fill();
      c.stroke();
      c.closePath();
    }
  };

  const clearCanvas = function() {
    c.beginPath();
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.closePath();
  };

  const initDrawing = function(currentData, theme) {
    drawSections(theme);
    drawGrid(theme);
    drawText();
    drawChart(currentData);
  };

  const calcValues = function() {
    width = radarChart.clientWidth;
    canvas.setAttribute('width', width);
    canvas.style.width = `${width}px`;
  };

  window.innerWidth <= 400 ? chartRadius = 110 : chartRadius = 130;
  calcValues();
  initDrawing(data, defaultTheme);

  btnNavMinimizeToggle.addEventListener('click', () => {
    calcValues();
    initDrawing(data, defaultTheme);
  });

  data.forEach(el => {
    projectsList.insertAdjacentHTML('beforeend', getProjectTemplate(el.name, el.color));
  });

  projectsList.addEventListener('click', e => {
    if(e.target.closest('.btn-choice-project')) {
      e.preventDefault();
      const btnIndex = [...projectsList.children].indexOf(e.target.closest('.btn-choice-project').parentElement);
      const chart = [];
      chart.push(...data, data[btnIndex]);
      chart.splice(btnIndex, 1);
      clearCanvas();
      initDrawing(chart, defaultTheme);
    }
  });

  btnThemesToggle.addEventListener('click', () => {
    defaultTheme === darkTheme ? defaultTheme = lightTheme : defaultTheme = darkTheme;
    canvas.style.backgroundColor = defaultTheme.bgColor;
    clearCanvas();
    initDrawing(data, defaultTheme);
  });

  window.addEventListener('resize', () => {
    window.innerWidth <= 400 ? chartRadius = 110 : chartRadius = 130;

    calcValues();
    initDrawing(data, defaultTheme);
  });
})();
