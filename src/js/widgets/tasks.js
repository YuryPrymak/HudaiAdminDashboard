export default (() => {
  const tasksList = document.querySelector('.widget-tasks .tasks');
  const newTaskInput = document.querySelector('.widget-tasks .input-add-new-task');
  const btnAddNewTask = document.querySelector('.widget-tasks .btn-add-new-task');

  let taskTitle = null;

  const getTaskTemplate = function() {
    return `
    <li class="task">
      <button class="checkbox"></button>
      <div class="info">
        <p class="title">${taskTitle}</p>
        <p class="name">Added by Joy Dutta</p>
      </div>
      <button class="btn-remove-task">  
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" preserveAspectRatio="none">
          <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>
        </svg>               
      </button>
    </li>`;
  };

  const checkboxToggle = function(checkbox) {
    checkbox.classList.toggle('checkbox-toggle');
  };

  const removeTask = function(task) {
    task.remove();
  };

  const addNewTask = function() {
    if(newTaskInput.value !== '' && newTaskInput.value.trim() !== '') {
      newTaskInput.value = '';
      tasksList.insertAdjacentHTML('beforeend', getTaskTemplate(taskTitle));
    } else {
      newTaskInput.value = '';
    }
  };

  tasksList.addEventListener('click', e => {
    if(e.target.nodeName === 'BUTTON' && e.target.classList.contains('checkbox')) {
      checkboxToggle(e.target);
    }
    if(e.target.closest('.btn-remove-task')) {
      removeTask(e.target.closest('.btn-remove-task').parentNode);
    }
  });

  newTaskInput.addEventListener('input', e => {
    taskTitle = e.target.value;
  });

  newTaskInput.addEventListener('keyup', e => {
    if(e.keyCode === 13) {
      e.preventDefault();
      addNewTask();
    }
  });

  btnAddNewTask.addEventListener('click', addNewTask);
})();
