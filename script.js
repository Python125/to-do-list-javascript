const todoList = [];

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoListElement = document.getElementById("todo-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText !== "") {
    addTodoItem(todoText);
    input.value = "";
  }
});

function addTodoItem(text) {
  const todoItem = {
    id: Date.now(),
    text,
    completed: false,
  };
  todoList.push(todoItem);
  renderTodoItem(todoItem);
}

function renderTodoItem(todoItem) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" class="checkbox">
    <span>${todoItem.text}</span>
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>
  `;

  const checkbox = li.querySelector(".checkbox");
  const span = li.querySelector("span");
  const editButton = li.querySelector(".edit-button");
  const deleteButton = li.querySelector(".delete-button");

  checkbox.addEventListener("change", () => {
    todoItem.completed = checkbox.checked;
    li.classList.toggle("completed", checkbox.checked);
  });

  editButton.addEventListener("click", () => {
    span.contentEditable = true;
    span.focus();
    span.addEventListener("blur", handleEdit);
    span.addEventListener("keydown", handleKeyPress);
  });

  deleteButton.addEventListener("click", () => {
    const index = todoList.findIndex((item) => item.id === todoItem.id);
    if (index !== -1) {
      todoList.splice(index, 1);
      li.remove();
    }
  });

  function handleEdit() {
    const newText = span.textContent.trim();
    if (newText !== "") {
      todoItem.text = newText;
    }
    span.contentEditable = false;
    span.removeEventListener("blur", handleEdit);
    span.removeEventListener("keydown", handleKeyPress);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      span.blur();
    }
  }

  todoListElement.appendChild(li);
}
