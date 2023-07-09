window.addEventListener("DOMContentLoaded", () => {
  const todoList = [
    "Read chapter 7 of Harry Potter 4",
    "Reason through JavaScript problems",
    "Eat dinner",
    "Do laundry",
  ];

  const todoListElement = document.getElementById("todo-list");

  todoList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    todoListElement.append(li);
  });
});
