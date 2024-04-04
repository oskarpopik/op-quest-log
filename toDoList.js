// WILL USE THIS LATER ON
function updateTaskList() {}

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
  // WILL USE THIS LATER ON
  updateTaskList();
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

      const deleteButtonElement = document.createElement("button");
      deleteButtonElement.classList.add("delete-button");
      deleteButtonElement.innerText = "Delete";

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
  });
  displayTask();
}

window.addEventListener("load", loadHandler);
