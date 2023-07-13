window.addEventListener("DOMContentLoaded", () => {
  const todoList = [];

  const todoListElement = document.getElementById("todo-list");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const addButton = document.getElementById("add-btn");

  addButton.addEventListener("click", () => {
    const title = titleInput.value;
    const description = descriptionInput.value;

    if (title && description) {
      const newItem = {
        title: title,
        description: description,
        completed: false,
      };

      todoList.push(newItem);

      const li = document.createElement("li");
      const textSpan = document.createElement("span");
      textSpan.textContent = `${title}: ${description}`;
      li.appendChild(textSpan);

      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      editButton.classList.add("custom-edit-btn");
      li.appendChild(editButton);

      const crossOffButton = document.createElement("button");
      crossOffButton.innerHTML = '<i class="fas fa-check"></i>';
      crossOffButton.classList.add("custom-cross-off-btn");
      li.appendChild(crossOffButton);

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteButton.classList.add("custom-delete-btn");
      li.appendChild(deleteButton);

      todoListElement.appendChild(li);

      crossOffButton.addEventListener("click", () => {
        textSpan.classList.toggle("completed");
        newItem.completed = !newItem.completed;
      });

      deleteButton.addEventListener("click", () => {
        const index = todoList.indexOf(newItem);
        if (index > -1) {
          todoList.splice(index, 1);
        }
        li.remove();
      });

      editButton.addEventListener("click", () => {
        editButtonAction(textSpan, newItem);
      });

      titleInput.value = "";
      descriptionInput.value = "";
    }
  });

  function editButtonAction(element, item) {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = element.textContent;
    editInput.classList.add("edit-input");

    const saveButton = document.createElement("button");
    saveButton.innerHTML = '<i class="fas fa-save"></i>';
    saveButton.classList.add("saveBtn");

    saveButton.addEventListener("click", () => {
      const updatedText = editInput.value;
      element.textContent = updatedText;
      item.title = updatedText.split(": ")[0];
      item.description = updatedText.split(": ")[1];
      editInput.remove();
      saveButton.remove();
    });

    element.innerHTML = "";
    element.appendChild(editInput);
    element.appendChild(saveButton);
  }
});
