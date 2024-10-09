let tasks = [{ id: 1, name: "Belajar HTML" }];
const todoListEl = document.querySelector("#todoList");
const taskInputEl = document.querySelector("#taskInput");
const taskIdEl = document.querySelector("#taskId");

// read form dom and add event listener
const form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", handleSubmit);

function renderTodo() {
  // reset todo list first
  todoListEl.innerHTML = "";

  // loop through tasks
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const liEl = document.createElement("li");
    liEl.innerHTML = `
          <div class="todo">${task.name}</div>
          <button class="editBtn" onclick="editTask(${task.id})">Edit</button>
          <button class="deleteBtn" onclick="deleteTask(${task.id})">Delete</button>
          `;

    todoListEl.appendChild(liEl);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  // if taskId exists then update
  if (taskIdEl.value) {
    updateTask(taskIdEl.value, taskInputEl.value);
  }
  // if no taskId then add new one
  else {
    let id = 1;

    if (tasks.length > 0) {
      id = tasks[tasks.length - 1].id + 1;
    }

    tasks.push({ id: id, name: taskInputEl.value });
  }

  // re-render todo list
  renderTodo();
  // reset form
  taskIdEl.value = "";
  taskInputEl.value = "";
}

function deleteTask(id) {
  if (!confirm("Anda yakin akan menghapus task ini?")) {
    return;
  }

  const tmpTask = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      tmpTask.push(tasks[i]);
    }
  }

  // update list
  tasks = tmpTask;
  // re-render todo list
  renderTodo();
}

function editTask(id) {
  let task;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      task = tasks[i];
      taskIdEl.value = task.id;
      taskInputEl.value = task.name;
      break;
    }
  }
}

function updateTask(id, name) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].name = name;
      break;
    }
  }
}

renderTodo();
