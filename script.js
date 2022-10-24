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

  taskInput.value = "";
  /*here i am clearing the input after submitting so it is ready for a second input to be submitted*/

  link.addEventListener("click", function (e) {
    if (confirm("Are You Sure?")) {
      li.remove();
    }
  });

  let task = taskInput.value;
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
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
}

function filterTasks(e) {
  /*i am able to loop through the lis here because querySelectorAll returns a node list, but if it was getElementByClass
  then we would have to convert it into an array to be able to loop through it*/
  e.preventDefault();
  let text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
