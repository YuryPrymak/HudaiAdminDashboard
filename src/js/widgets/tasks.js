import Widget from './Widget';

class Tasks extends Widget {
  constructor(emitter, widgetTitle, rootSelector, data) {
    super(widgetTitle);

    this.emitter = emitter;

    this.data = data;
    this.rootSelector = rootSelector;
    this.root = document.querySelector(this.rootSelector);
    this.tasksSelector = null;
    this.newTaskInput = null;

    this.render();
    this.addListeners();
  }

  removeTask(taskId) {
    this.data = this.data.filter(task => task.id !== +taskId);
    this.tasksSelector.innerHTML = '';
    this.tasksSelector.insertAdjacentHTML('afterbegin', this.getTaskList());

    if(this.data.length === 0) {
      this.tasksSelector.classList.add('tasks-list-empty');
    } else {
      this.tasksSelector.classList.remove('tasks-list-empty');
    }
  }

  addTask() {
    if(this.newTaskInput.value !== '' && this.newTaskInput.value.trim() !== '') {
      this.data.unshift(
        {
          title: this.newTaskInput.value,
          author: 'Admin',
          isDone: false,
          id: Math.floor(Math.random() * (99999 - 10000 + 1) + 10000),
        },
      );
      this.newTaskInput.value = '';
      this.tasksSelector.innerHTML = '';
      this.tasksSelector.insertAdjacentHTML('afterbegin', this.getTaskList());
    } else {
      this.newTaskInput.value = '';
    }

    if(this.data.length === 0) {
      this.tasksSelector.classList.add('tasks-list-empty');
    } else {
      this.tasksSelector.classList.remove('tasks-list-empty');
    }
  }

  getTaskList() {
    const getTask = task => `
      <li class="task" data-task-id="${task.id}">
        <button class="checkbox ${task.isDone ? 'checkbox-toggle' : ''}"></button>
        <div class="info">
          <p class="title">${task.title}</p>
          <p class="name">Added by ${task.author}</p>
        </div>
        <button class="btn-remove-task">  
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" preserveAspectRatio="none">
            <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>
          </svg>               
        </button>
      </li>
    `;

    const template = this.data.map(task => getTask(task)).join('');

    return template;
  }

  getTasksTemplate() {
    const root = document.createElement('ul');
    const template = this.getTaskList();

    root.classList.add('tasks');
    root.insertAdjacentHTML('afterbegin', template);

    return root;
  }

  getSearchInputTemplate() {
    const root = document.createElement('div');

    const template = `
      <input class="input-add-new-task" type="text" maxlength="23" placeholder="Add a new task ..." autocomplete="off">
      <button class="btn-add-new-task">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" preserveAspectRatio="none">
          <path d="M24 18h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4z"></path>
        </svg>
      </button>
    `;

    root.classList.add('add-new-task');
    root.insertAdjacentHTML('afterbegin', template);

    return root;
  }

  render() {
    this.root.append(this.getHeaderTemplate());
    this.root.append(this.getTasksTemplate());
    this.root.append(this.getSearchInputTemplate());
  }

  addListeners() {
    const tasksList = document.querySelector('.widget-tasks .tasks');
    this.tasksSelector = document.querySelector(`${this.rootSelector} .tasks`);
    this.newTaskInput = document.querySelector('.widget-tasks .input-add-new-task');
    const btnAddNewTask = document.querySelector('.widget-tasks .btn-add-new-task');

    tasksList.addEventListener('click', e => {
      if(e.target.nodeName === 'BUTTON' && e.target.classList.contains('checkbox')) {
        e.target.classList.toggle('checkbox-toggle');
      }

      if(e.target.closest('.btn-remove-task')) {
        this.removeTask(e.target.closest('[data-task-id]').dataset.taskId);
      }
    });

    btnAddNewTask.addEventListener('click', this.addTask.bind(this));

    this.newTaskInput.addEventListener('keyup', e => {
      if(e.keyCode === 13) {
        e.preventDefault();
        this.addTask();
      }
    });

    this.addWidgetHeaderListener();
    this.addBtnOptionsEmitter();
  }
}

export default Tasks;
