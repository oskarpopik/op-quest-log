function saveTask() {
  const inputElement = document.getElementById("taskInput");
  // X.value refers to the value of input data done by the user in the input window
  let newTask = {
    taskName: inputElement.value,
    taskStatus: false,
  };

  // Saving the newTask to local storange
  // First a check if the newTask is undefined and if so we want to set it up as an empty array. The empty array is just to make sure that there is a value
  if (localStorage.newTask === undefined) {
    localStorage.newTask = JSON.stringify([]);
  }

  // Saving new tasks in an array
  // Transofrmation of the newTask string to an array
  let taskArray = JSON.parse(localStorage.newTask);
  // Adding an task to the array
  taskArray.push(newTask);
  // Saving it back to the local storage
  localStorage.newTask = JSON.stringify(taskArray);

  displayTask();
}

// The following 2 lines of code was adapted from https://www.geeksforgeeks.org/html-clearing-the-input-field/ Accessed: 2024-04-06
function clearInputField() {
  const inputElement = document.getElementById("taskInput");
  inputElement.value = "";
}

function displayTask() {
  // Checking if the newTask is NOT undefined
  if (localStorage.newTask !== undefined) {
    let taskArray = JSON.parse(localStorage.newTask);

    const taskListElement = document.getElementById("taskList");

    // Removing all childreen inside, so it doesn't double the values
    taskListElement.innerText = "";

    for (let task of taskArray) {
      const liElement = document.createElement("li");
      liElement.classList.add("task-list-item");
      liElement.innerText = task.taskName + " / " + task.taskStatus + " ";

      const doneButtonElement = document.createElement("button");
      doneButtonElement.classList.add("done-button");
      doneButtonElement.innerText = "Done";

      // Mark the task as completed
      doneButtonElement.addEventListener("click", () => {
        // Geting the corresponding index of the chosen task in the taskArray
        const taskIndex = taskArray.indexOf(task);

        // Check if this line gives the correct value
        console.log(taskArray[taskIndex].taskStatus);

        // The following line of code was adapted from https://www.geeksforgeeks.org/how-to-toggle-a-boolean-using-javascript/ Accessed: 2024-04-07
        taskArray[taskIndex].taskStatus = !taskArray[taskIndex].taskStatus;

        // Update of the localstorage
        localStorage.newTask = JSON.stringify(taskArray);

        // Refresh of the task display
        displayTask();
      });

      const deleteButtonElement = document.createElement("button");
      deleteButtonElement.classList.add("delete-button");
      deleteButtonElement.innerText = "Delete";

      // Remove a task
      deleteButtonElement.addEventListener("click", () => {
        // Geting the corresponding index of the chosen task in the taskArray
        const taskIndex = taskArray.indexOf(task);

        // Removing the chosen task from the taskArray
        taskArray.splice(taskIndex, 1);

        // Update of the localstorage
        localStorage.newTask = JSON.stringify(taskArray);

        // Refresh of the task display
        displayTask();
      });

      liElement.appendChild(doneButtonElement);
      liElement.appendChild(deleteButtonElement);

      taskListElement.appendChild(liElement);
    }
  }
}

function loadHandler() {
  const addButtonElement = document.getElementById("addButton");
  addButtonElement.addEventListener("click", function () {
    saveTask();
    clearInputField();
  });
  displayTask();
}

window.addEventListener("load", loadHandler);
