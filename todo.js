const todoInput = document.querySelector("input");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const completedList = document.getElementById("completedList");

// Create a function to add new task to the todo list
function addTask() {
    const taskName = todoInput.value.trim();
    if (taskName.length === 0) {
        console.log("Please enter a valid task");
        return;
    } else {
        // Create li elements for each task
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `<input type="checkbox"><span>${taskName}</span> <button class="editButton">Edit</button><button class="deleteButton">Delete</button>`;

        // Append task item to the ul element
        todoList.appendChild(taskItem);
    }

    // Clear input after adding task item
    todoInput.value = "";
}
// Add click event listener to the "addButton" element 
addButton.addEventListener("click", addTask);

// Function to remove a task from the todo list
function deleteTask(e) {
    const taskItem = e.target.parentElement;
    todoList.removeChild(taskItem);
}

// Function to edit a task
function editTask(e) {
    const taskItem = e.target.parentElement;
    const taskSpan = taskItem.querySelector("span");
    const currentTaskName = taskSpan.textContent;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentTaskName;
    // Replace the span with the input element
    taskItem.replaceChild(editInput, taskSpan);

    // Replace the edit button with the save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("saveButton");
    taskItem.replaceChild(saveButton, e.target);

    // Focus the input element
    editInput.focus();

    // Save the edited task when the user clicks the "Save" button
    saveButton.addEventListener("click", e => {
        const newTaskName = editInput.value.trim();
        if (newTaskName.length === 0) {
            console.log("Please enter a valid task");
            return;
        } else {
            taskItem.replaceChild(taskSpan, editInput);
            taskSpan.textContent = newTaskName;
            // Replace the save button with the edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("editButton");
            taskItem.replaceChild(editButton, e.target);
        }
    });
}

// Function to move a task from todo list to the Completed list
function moveTaskToCompleted(e) {
    const taskItem = e.target.parentElement; //e.target is the checkbox input
    const editButton = taskItem.querySelector(".editButton");

    // Remove the checkbox from the task item
    taskItem.removeChild(e.target);
    // Remove the edit button from the task item
    taskItem.removeChild(editButton);
    // Move the task item to the Completed list
    completedList.appendChild(taskItem);
}

// Function to remove a completed task from the Completed list
function deleteCompletedTask(e) {
    const taskItem = e.target.parentElement;
    completedList.removeChild(taskItem);
}

// add click event listeners on the completedList
completedList.addEventListener("click", event => {
    if (event.target.classList.contains("deleteButton")) {
        deleteCompletedTask(event);
    }
});

// add click event listeners on the <ul> element, ie.todolist for event delegation
todoList.addEventListener("click", event => {
    if (event.target.classList.contains("deleteButton")) {
        deleteTask(event);
    } else if (event.target.classList.contains("editButton")) {
        editTask(event);
    } else if (event.target.matches("input[type='checkbox']")) {
        moveTaskToCompleted(event);
    }
});