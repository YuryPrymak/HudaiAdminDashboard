import RadarChart from './charts/RadarChart';

class OurTechnologies extends RadarChart {
  constructor(emitter, title, rootSelector, data) {
    super(title, {
      data,
      width: document.querySelector(rootSelector).clientWidth,
      height: 350,
      chartRadius: 130,
    });

    this.emitter = emitter;

    this.rootSelector = rootSelector;
    this.root = document.querySelector(this.rootSelector);
    this.canvasClassName = 'radar-chart';

    this.render();
    this.addListeners();
  }

  getProjectsTemplate() {
    const root = document.createElement('ul');

    const getProjectItem = projects => {
      const getProject = ({ name, color }) => `
        <li>
          <a class="btn-choice-project" data-name="${name}">
            <span class="color-id" style="background-color: ${color};"></span>
            ${name}
          </a>
        </li>
      `;

      const template = projects.map(project => getProject(project)).join('');

      return template;
    };

    root.classList.add('projects');
    root.insertAdjacentHTML('afterbegin', getProjectItem(this.data));

    return root;
  }

  render() {
    this.root.append(this.getHeaderTemplate());
    this.root.append(this.getCanvas(this.canvasClassName));
    this.canvasInitValues(this.canvasClassName);
    this.canvasInitDrawing();
    this.root.append(this.getProjectsTemplate());

    window.innerWidth <= 400 ? this.updateCanvas('chartRadius', 110) : this.updateCanvas('chartRadius', 130);
  }

  addListeners() {
    const btnThemesToggle = document.querySelector('.header .btn-themes-toggle');
    const btnNavMinimizeToggle = document.querySelector('.header .btn-nav-toggle');
    const projectsList = document.querySelector('.widget-our-technologies .projects');

    btnThemesToggle.addEventListener('click', this.themeToggle.bind(this));

    btnNavMinimizeToggle.addEventListener('click', () => {
      this.updateCanvas('width', this.root.clientWidth);
    });

    window.addEventListener('resize', () => {
      window.innerWidth <= 400 ? this.updateCanvas('chartRadius', 110) : this.updateCanvas('chartRadius', 130);

      this.updateCanvas('width', this.root.clientWidth);
    });

    projectsList.addEventListener('click', e => {
      if(e.target.closest('.btn-choice-project')) {
        const projectName = e.target.closest('.btn-choice-project').dataset.name;

        e.preventDefault();

        const moveToTop = (data, name) => {
          const arr = [];
          let index = null;

          data.forEach((project, i) => {
            if(project.name === name) {
              index = i;
            }
          });

          arr.push(...data, data[index]);
          arr.splice(index, 1);

          return arr;
        };

        this.updateCanvas('data', moveToTop(this.data, projectName));
      }
    });

    this.addWidgetHeaderListener();
    this.addBtnOptionsEmitter();
  }
}

export default OurTechnologies;
