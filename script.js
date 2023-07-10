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

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteButton.classList.add("custom-delete-btn");
      li.appendChild(deleteButton);

      todoListElement.appendChild(li);

      deleteButton.addEventListener("click", () => {
        const index = todoList.indexOf(newItem);
        if (index > -1) {
          todoList.splice(index, 1);
        }
        li.remove();
      });

      editButton.addEventListener("click", () => {
        const newTitleInput = document.createElement("input");
        newTitleInput.type = "text";
        newTitleInput.value = newItem.title;

        const newDescriptionInput = document.createElement("input");
        newDescriptionInput.type = "text";
        newDescriptionInput.value = newItem.description;

        const saveButton = document.createElement("button");
        saveButton.innerHTML = '<i class="fas fa-save"></i>';
        saveButton.classList.add("custom-save-btn");
        li.appendChild(saveButton);

        li.replaceChild(newTitleInput, textSpan);
        li.replaceChild(newDescriptionInput, editButton);
        li.appendChild(saveButton);

        saveButton.addEventListener("click", () => {
          const newTitle = newTitleInput.value;
          const newDescription = newDescriptionInput.value;

          if (newTitle && newDescription) {
            newItem.title = newTitle;
            newItem.description = newDescription;
            textSpan.textContent = `${newTitle}: ${newDescription}`;
          }

          li.replaceChild(textSpan, newTitleInput);
          li.replaceChild(editButton, newDescriptionInput);
          li.removeChild(saveButton);
        });
      });

      titleInput.value = "";
      descriptionInput.value = "";
    }
  });
});
