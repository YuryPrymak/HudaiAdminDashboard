export default (() => {
  const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');
  const infoCountry = document.querySelectorAll('.widget-earn-by-country .country');
  const infoValue = document.querySelectorAll('.widget-earn-by-country .value');

  const darkTheme = {
    bgColor: '#282a31',
  };

  const lightTheme = {
    bgColor: '#fff',
  };

  let defaultTheme = darkTheme;

  const canvas = document.querySelector('.widgets .earn-by-country');
  const c = canvas.getContext('2d');
  const widthAndHeight = 120;
  canvas.setAttribute('width', widthAndHeight);
  canvas.setAttribute('height', widthAndHeight);
  canvas.style.width = `${widthAndHeight}px`;
  canvas.style.height = `${widthAndHeight}px`;
  canvas.style.backgroundColor = defaultTheme.bgColor;

  const { PI } = Math;

  const data = [
    {
      country: 'United States',
      value: 37,
      color: '#6fe7dd',
    },
    {
      country: 'Germany',
      value: 23,
      color: '#3490de',
    },
    {
      country: 'Australia',
      value: 17,
      color: '#6639a6',
    },
    {
      country: 'England',
      value: 12,
      color: '#d11e5b',
    },
    {
      country: 'Other',
      value: null,
      color: '#212228',
    },
  ];

  let startPost = 1.5 * PI; // top of circle

  const calcOtherValue = function() {
    let value = 0;
    data.forEach((el, i) => {
      if(i !== data.length - 1) {
        value += el.value;
      }
    });
    data[data.length - 1].value = 100 - value;
  };

  const drawPart = function(i) {
    const endValue = startPost + (Math.PI * 2) * (data[i].value / 100);
    c.beginPath();
    c.strokeStyle = data[i].color;
    c.lineWidth = 20;
    c.arc(widthAndHeight / 2, widthAndHeight / 2, widthAndHeight / 2 - 10, startPost, endValue);
    c.stroke();
    c.closePath();
    startPost = endValue;
  };

  const initDrawing = function() {
    calcOtherValue();
    for(let i = 0; i < data.length; i++) {
      drawPart(i);
      infoCountry[i].textContent = data[i].country;
      infoValue[i].textContent = `- ${data[i].value}%`;
    }
  };

  initDrawing();

  btnThemesToggle.addEventListener('click', () => {
    defaultTheme === darkTheme ? defaultTheme = lightTheme : defaultTheme = darkTheme;
    canvas.style.backgroundColor = defaultTheme.bgColor;
  });
})();
