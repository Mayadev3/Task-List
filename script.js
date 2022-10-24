const form = document.getElementById("task-form");
const taskList = document.querySelector("ul.collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
  //add task event
  form.addEventListener("submit", addTask);
}
function addTask(e) {
  e.preventDefault();
  let values = taskInput.value;
  console.log(values);
}
