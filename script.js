const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = [];

// Function to save todos to local storage
todoForm.addEventListener("submit", function (e) {
	e.preventDefault(); // Prevents page reload
	addTodo();
});

// Function to add a new todo to array
function addTodo() {
	const todoText = todoInput.value.trim();
	if (todoText === "") {
		alert("Please enter a valid todo.");
	} else allTodos.push(todoText); // Add todo to array
	createTodoItem(todoText); // Create new todo item to display
	todoInput.value = ""; // Clear input field
	console.log(allTodos);
}

function createTodoItem(todo) {
	const todoLi = document.createElement("li"); // Create new li to html
	todoLi.innerText = todo; // Add todo text to li
	todoListUL.append(todoLi); // Append li to ul
}
