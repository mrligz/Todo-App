const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList(); // Update todo list on page

// Function to save todos to local storage
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents page reload
  addTodo();
});

// Function to add a new todo to array
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject); // Add todo to array
    updateTodoList(); // Update todo list on page
    saveTodos(); // Save todos to local storage

    todoInput.value = ""; // Clear input field
  }
}
function updateTodoList() {
  todoListUL.innerHTML = ""; // Clear existing todo items
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex); // Create new todo item to display
    todoListUL.append(todoItem); // Append li to ul
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLi = document.createElement("li"); // Create new li to html
  const todoText = todo.text;
  todoLi.className = "todo";
  todoLi.innerHTML = ` <input type="checkbox" id="${todoId}" />
        <label class="custom-checkbox" for="${todoId}">
          <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#e8eaed">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>
        </label>
        <label class="todo-text" for="${todoId}">${todoText}</label>
        <button class="delete-button">
          <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#e8eaed">
            <path
              d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button> `;
  const deleteButton = todoLi.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex); // Delete todo from array and local storage
  });
  const checkbox = todoLi.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked; // Update todo status and local storage
    saveTodos(); // Save todos to local storage
  });
  checkbox.checked = todo.completed; // Set checkbox status based on todo status
  return todoLi; // Return li for future reference
}
function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex); // Remove todo from array
  saveTodos(); // Save todos to local storage
  updateTodoList(); // Update todo list on page
}
function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
