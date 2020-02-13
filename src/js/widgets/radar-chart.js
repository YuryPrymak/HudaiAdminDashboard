export default (() => {
  const btnOptions = document.querySelector('.widget-radar-chart .btn-options');
  const optionsList = document.querySelector('.widget-radar-chart .options-list');
  const projectsList = document.querySelector('.widget-radar-chart .projects');

  const canvas = document.querySelector('.widgets .radar-chart');
  const c = canvas.getContext('2d');
  const width = 420;
  const height = 350;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.backgroundColor = '#282a31';

  const { PI, sin, cos } = Math;

  const chartRadius = 150;

  const tech = ['Html', 'Css', 'Js', 'Node', 'Database'];

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

  const canvasCenter = {
    x: width / 2,
    y: height / 2,
  };

  const degToRad = function(deg) { // Convert degrees to radians
    return deg * PI / 180;
  };

  const sectorInRadians = degToRad(360 / tech.length);

  const getX = function(radius, radian) {
    return canvasCenter.x + radius * cos(radian - degToRad(90));
  };

  const getY = function(radius, radian) {
    return canvasCenter.y + radius * sin(radian - degToRad(90));
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

  const drawSections = function() {
    c.beginPath();
    c.strokeStyle = '#494b51';
    c.lineWidth = '2';
    for(let i = 0; i < tech.length; i++) {
      c.moveTo(canvasCenter.x, canvasCenter.y);
      c.lineTo(getX(chartRadius, i * sectorInRadians), getY(chartRadius, i * sectorInRadians));
    }
    c.stroke();
    c.closePath();
  };

  const drawGrid = function() {
    c.beginPath();
    c.strokeStyle = '#494b51';
    c.lineWidth = '2';
    for(let i = 0; i < tech.length; i++) {
      for(let j = 0; j <= tech.length; j++) {
        if(j === 0) {
          c.moveTo(getX(chartRadius - (chartRadius / 5 * i), j * sectorInRadians), getY(chartRadius - (chartRadius / 5 * i), j * sectorInRadians));
        }
        c.lineTo(getX(chartRadius - (chartRadius / 5 * i), j * sectorInRadians), getY(chartRadius - (chartRadius / 5 * i), j * sectorInRadians));
      }
    }
    c.stroke();
    c.closePath();
  };

  const drawText = function() {
    c.beginPath();
    c.fillStyle = '#d8d8d9';

    tech.forEach((text, i) => {
      c.textBaseline = 'middle';

      if(getX(chartRadius, i * sectorInRadians) === canvasCenter.x) {
        c.textAlign = 'center';
      } else if(getX(chartRadius, i * sectorInRadians) < canvasCenter.x) {
        c.textAlign = 'right';
      } else if(getX(chartRadius, i * sectorInRadians) > canvasCenter.x) {
        c.textAlign = 'left';
      }

      c.fillText(text, getX(chartRadius + 10, i * sectorInRadians), getY(chartRadius + 10, i * sectorInRadians));
    });

    c.closePath();
  };

  const drawChart = function(chartData) {
    for(const el of chartData) {
      c.beginPath();
      const grad = c.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, el.color);
      grad.addColorStop(1, `${el.color}99`);
      c.strokeStyle = '#ffffff00';
      c.fillStyle = grad;

      for(let i = 0; i < tech.length; i++) {
        const valInRatio = chartRadius / 100 * el.values[i];
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

  drawSections();
  drawGrid();
  drawText();
  drawChart(data);

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
      drawSections();
      drawGrid();
      drawText();
      drawChart(chart);
    }
  });

  btnOptions.addEventListener('click', () => {
    optionsList.classList.toggle('show-options');
  });
})();
