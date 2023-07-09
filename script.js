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
        textSpan.classList.add("completed");
        newItem.completed = true;
      });

      deleteButton.addEventListener("click", () => {
        const index = todoList.indexOf(newItem);
        if (index > -1) {
          todoList.splice(index, 1);
        }
        li.remove();
      });

      titleInput.value = "";
      descriptionInput.value = "";
    }
  });
});
