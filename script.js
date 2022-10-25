const form = document.getElementById("task-form");
const taskList = document.querySelector("ul.collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
  //this function is for all the event listeners i want
  form.addEventListener("submit", addTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
  taskList.addEventListener("click", removeTask);
  //DOM Load event
  document.addEventListener("DOMContentLoaded", putStoredTasksInDom);
}

function putStoredTasksInDom() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("collection-item");
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className =
      "delete-item secondary-content"; /*secondary-content is a class name from materialize*/
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    taskList.appendChild(li);

    /*here i am clearing the input after submitting so it is ready for a second input to be submitted*/
  });
}

function addTask(e) {
  e.preventDefault();
  const li = document.createElement("li");
  li.classList.add("collection-item");
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className =
    "delete-item secondary-content"; /*secondary-content is a class name from materialize*/
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  li.appendChild(link);
  taskList.appendChild(li);

  /*here i am clearing the input after submitting so it is ready for a second input to be submitted*/

  let task = taskInput.value;
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  tasks.forEach((task) => {
    console.log(task);
  });

  taskInput.value = "";
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1); //if i don't assign to take off 1, then it will take this one specific one off and the rest
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear tasks function
function clearTasks() {
  //this is one way: taskList.innerHTML = "";
  //this is a faster way
  taskList.firstChild;
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  /*i am able to loop through the lis here because querySelectorAll returns a node list, but if it was getElementByClass
  then we would have to convert it into an array to be able to loop through it*/
  /*i put it either as let something = e.target.value or something = input.value*/
  /*indexOf being -1 always means that the item is not available so being !=-1 or >-1 then it is available*/
  let values = e.target.value;
  let lis = document.querySelectorAll(".collection-item");
  lis.forEach((li) => {
    let liContent = li.textContent;
    if (liContent.indexOf(values) != -1) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
}
/* in the filterTasks :
select the input value
select all the lis
loop through the lis and put their text content in a variable
then we overlap the li text content with the value using liContent.indexOf(value)
then since it is indexOf we can see if there is a match by going character by character, if it is -1 then the characters
of the value and li textContent dont match*/
