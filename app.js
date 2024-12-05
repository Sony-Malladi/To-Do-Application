let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
 
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 
    function renderTasks() {
        const taskList = document.getElementById('task-list');
        const totalTasksSpan = document.getElementById('total-tasks');
        const completedTasksSpan = document.getElementById('completed-tasks');
      taskList.innerHTML = '';
      let completedCount = 0;
 
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        if (task.completed) {
          taskItem.classList.add('completed');
          completedCount++;
        }
 
        taskItem.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="edit-button" onclick="editTask(${index})">Edit</button>
            <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            <button class="complete-button" onclick="toggleTask(${index})">Mark as ${task.completed ? 'Incomplete' : 'Complete'}</button>
          </div>
        `;
        taskList.appendChild(taskItem);
      });
 
      totalTasksSpan.textContent = tasks.length;
      completedTasksSpan.textContent = completedCount;
    }
 
    function addTask() {
        const taskInput = document.getElementById('task-input');
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const newTask = {
          text: taskText,
          completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        saveTasks();
        renderTasks();
      }
    }
 
    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }
 
    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
 
    function editTask(index) {
      const newText = prompt('Edit task:', tasks[index].text);
      if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    }
    document.addEventListener('DOMContentLoaded', () => {
        const addTaskButton = document.getElementById('add-task');
    addTaskButton.addEventListener('click', addTask);
 
    renderTasks();  // Render tasks on initial load
    });