// getting all  required element
const inputBox = document.querySelector(".inputfiled input ");
const addbtn = document.querySelector(".inputfiled button ");
const todolist = document.querySelector(".todolist");
const deleteAllbtn = document.querySelector(".footer button ");

inputBox.onkeyup = () => {
  let userData = inputBox.value; // get data
  if (userData != 0) {
    // if user values aren't only space
    addbtn.classList.add("active"); // activty add btn
  } else {
    addbtn.classList.remove("active"); //activty add btn
  }
};

showTask(); // calling showTask
addbtn.onclick = () => {
  let userData = inputBox.value;
  let getloaclstorage = localStorage.getItem("Todolist"); // get localstorage
  if (getloaclstorage == null) {
    listarry = []; // creating blank arry
  } else {
    listarry = JSON.parse(getloaclstorage); // transforming  json   string into js object
  }
  listarry.push(userData); // pushing or adding user data
  localStorage.setItem("Todolist", JSON.stringify(listarry)); // transforming  js object into a json string
  showTask(); // calling showTask
  addbtn.classList.remove("active"); //activty add btn
};

// function add task to list
function showTask() {
  let getloaclstorage = localStorage.getItem("Todolist"); // get localstorage
  if (getloaclstorage == null) {
    listarry = []; // creating blank arry
  } else {
    listarry = JSON.parse(getloaclstorage); // transforming  json   string into js object
  }
  const pendingNum = document.querySelector(".pendingNum");
  pendingNum.textContent = listarry.length; // passing count pending to pendingNum
  if (listarry.length > 0) {
    // if array lenght greater than 0
    deleteAllbtn.classList.add("active"); // active clear all button
  } else {
    deleteAllbtn.classList.remove("active"); // un active button
  }
  let newtask = "";
  listarry.forEach((element, index) => {
    newtask += `<li>${element}<span onclick="deleteTasks(${index})"> <i class="fas fa-trash"></i></span></li>`;
  });
  todolist.innerHTML = newtask; //adding a new tag
  inputBox.value = "";
}
// delete task function
function deleteTasks(index) {
  let getloaclstorage = localStorage.getItem("Todolist");
  listarry = JSON.parse(getloaclstorage);
  listarry.splice(index, 1); // delete task by index
  // after delete show  update tasks
  localStorage.setItem("Todolist", JSON.stringify(listarry));
  showTask();
}
// delete all tasks
deleteAllbtn.onclick = () => {
  listarry = []; // empty an array
  // after delete show  update tasks
  localStorage.setItem("Todolist", JSON.stringify(listarry));
  showTask();
};
