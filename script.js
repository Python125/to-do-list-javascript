/* Select all the necessary Elements */
const input = document.querySelector(".todo_input");
const MainTodoContainer = document.getElementById("todos");
const addingButton = document.querySelector(".add-item");

addingButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (input.value.trim()) {
    let ulTag = document.createElement("ul");
    ulTag.classList.add("todo-list-container");

    let todoList = document.createElement("div");
    todoList.classList.add("todo-list");

    let liTag = document.createElement("li");
    liTag.innerText = input.value;
    liTag.classList.add("todo-item");

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button");

    let completeButton = document.createElement("button");
    completeButton.classList.add("completed");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';

    let editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add("editBtn");
    editBtn.onclick = function () {
      editWorking(liTag);
    };

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';

    ulTag.appendChild(todoList);
    todoList.appendChild(liTag);
    todoList.appendChild(buttonDiv);
    buttonDiv.appendChild(completeButton);
    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(trashButton);

    MainTodoContainer.appendChild(ulTag);

    input.value = "";

    todoList.addEventListener("click", function (e) {
      let items = e.target;
      if (items.classList[0] === "completed") {
        let todo = items.parentElement;
        let todo2 = todo.parentElement;
        todo2.classList.toggle("line_through");
      } else if (items.classList[0] === "trash") {
        let todo = items.parentElement;
        let todo2 = todo.parentElement;
        todo2.classList.add("fall");
        todo2.addEventListener("transitionend", function () {
          let todo3 = todo2.parentElement;
          todo3.remove();
        });
      }
    });
  } else if (input.value === "") {
    alert("Please fill the input field");
  }
});

function editWorking(e) {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = e.innerText;
  editInput.classList.add("edit-input");

  const saveButton = document.createElement("button");
  saveButton.innerHTML = '<i class="fas fa-save"></i>';
  saveButton.classList.add("saveBtn");

  saveButton.addEventListener("click", function () {
    e.innerText = editInput.value;
  });

  editInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      e.innerText = editInput.value;
    }
  });

  // Clear existing content of 'e' before appending the new elements
  e.innerHTML = "";
  e.appendChild(editInput);
  e.appendChild(saveButton);
}

function deleteAllElements() {
  let gettingUlTag = document.querySelectorAll(".todo-list-container");
  for (let i = 0; i < gettingUlTag.length; i++) {
    gettingUlTag[i].remove();
  }
  input.value = "";
}
