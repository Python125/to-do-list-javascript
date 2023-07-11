// Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const saveButton = document.querySelector(".save-btn");

let editingTodo = null; // To keep track of the currently editing todo

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrEditTodo);
filterOption.addEventListener("click", filterTodo);
saveButton.addEventListener("click", saveEditedTodo);

// Functions

function addTodo(e) {
  e.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText === "") {
    return;
  }

  const todo = {
    id: Date.now(),
    text: todoText,
    completed: false,
  };

  saveLocalTodos(todo);

  createTodoElement(todo);

  todoInput.value = "";
}

function createTodoElement(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const todoItem = document.createElement("li");
  todoItem.innerText = todo.text;
  todoItem.classList.add("todo-item");
  todoDiv.appendChild(todoItem);

  if (editingTodo && editingTodo.id === todo.id) {
    todoItem.contentEditable = true;
    todoItem.focus();
  }

  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fa fa-edit"></i>`;
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

function deleteOrEditTodo(e) {
  const item = e.target;
  const todoDiv = item.parentElement;

  if (item.classList[0] === "trash-btn") {
    todoDiv.classList.add("fall");
    removeLocalTodos(todoDiv);

    todoDiv.addEventListener("transitionend", () => {
      todoDiv.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    todoDiv.classList.toggle("completed");
    console.log(todoDiv);
  }

  if (item.classList[0] === "edit-btn") {
    const todoItem = todoDiv.querySelector(".todo-item");
    todoItem.contentEditable = true;
    todoItem.focus();
    editingTodo = {
      id: todoDiv.dataset.todoId,
      text: todoItem.innerText,
      completed: todoDiv.classList.contains("completed"),
    };
  }
}

function saveEditedTodo() {
  const todoItem = document.querySelector(".todo-item[contenteditable=true]");

  if (todoItem) {
    todoItem.contentEditable = false;

    const editedTodo = {
      id: editingTodo.id,
      text: todoItem.innerText.trim(),
      completed: editingTodo.completed,
    };

    if (editedTodo.text !== "") {
      updateLocalTodoItem(editedTodo);
    }

    editingTodo = null;
  }
}

function updateLocalTodoItem(todo) {
  let todos = getLocalTodos();

  todos = todos.map((existingTodo) => {
    if (existingTodo.id === todo.id) {
      return {
        id: existingTodo.id,
        text: todo.text,
        completed: todo.completed,
      };
    }
    return existingTodo;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodo() {
  const todos = Array.from(todoList.children);

  todos.forEach((todo) => {
    const todoCompleted = todo.classList.contains("completed");
    const filterValue = filterOption.value;

    if (
      (filterValue === "completed" && !todoCompleted) ||
      (filterValue === "uncompleted" && todoCompleted)
    ) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
}

function saveLocalTodos(todo) {
  let todos = getLocalTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todoDiv) {
  const todoId = todoDiv.dataset.todoId;
  let todos = getLocalTodos();
  todos = todos.filter((todo) => todo.id !== todoId);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos = [];
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }

  return todos;
}

function getTodos() {
  const todos = getLocalTodos();

  todos.forEach((todo) => {
    createTodoElement(todo);
  });
}