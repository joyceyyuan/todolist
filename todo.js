const todoInput = document.querySelector("input");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

// Create a function to add new task to the todo list
function addTask() {
    const taskName = todoInput.value.trim();
    if (taskName.length === 0) {
        console.log("Please enter a valid task");
        return;
    } else {
        // Create li elements for each task
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `<span>${taskName}</span> <button class="editButton">Edit</button><button class="deleteButton">Delete</button>`;

        // Append task item to the ul element
        todoList.appendChild(taskItem);
    }

    // Clear input after adding task item
    todoInput.value = "";
}
// Add click event listener to the "addButton" element 
addButton.addEventListener("click", addTask);

// Function to remove a task from the list
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
            /* console.log("taskItem in after clicking save button <-", taskItem);
            console.log("e.target in saveButton function <-", e.target);*/

            // Replace the save button with the edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("editButton");
            taskItem.replaceChild(editButton, e.target);
        }
    });
}

// add click event listener on the <ul> element, ie.todolist for event delegation
todoList.addEventListener("click", event => {
    if (event.target.classList.contains("deleteButton")) {
        deleteTask(event);
    } else if (event.target.classList.contains("editButton")) {
        editTask(event);
    }
});