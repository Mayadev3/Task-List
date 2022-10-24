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
  taskInput.value = "";
}
/*let tasks = JSON.parse(localStorage.getItem("tasks"));
tasks.forEach((task) => {
  console.log(task);
});*/
