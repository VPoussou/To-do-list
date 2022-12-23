// getting the required html elements for the job
inputtask = document.getElementById("input-task");
addtask = document.getElementById("add-task-button");
list = document.getElementById("task-list");
deletebutton = document.getElementsByClassName("delete-btn");

// Allowing for removing hardcoded tasks (Obsolete)
for (let i = 0; i < deletebutton.length; i++) {
    deletebutton[i].addEventListener("click", function(){
        this.parentElement.remove();
    });
};

// Adding tasks through the add task button
//Also adding the required event listeners to delete button and checkbox
addtask.addEventListener("click",function(){
    let taskname = inputtask.value;
    let newcheckbox = document.createElement("input");
    newcheckbox.classList.add("checkbox")
    newcheckbox.setAttribute("type","checkbox");
    let newspan = document.createElement("span");
    newspan.classList.add("task");
    newspan.innerHTML = taskname;
    let newdeletebutton = document.createElement("button");
    newdeletebutton.classList.add("delete-btn");
    newdeletebutton.innerHTML = "Delete";
    let newli = document.createElement("li");
    newli.classList.add("li")
    newli.appendChild(newcheckbox);
    newli.appendChild(newspan);
    newli.appendChild(newdeletebutton);
    list.appendChild(newli);
    newcheckbox.addEventListener("change",get_tasks);
    newdeletebutton.addEventListener("click", function(){
        newli.remove();
        get_tasks()
    });
    get_tasks();
});

//Updating task list as an array and setting it to local storage
function get_tasks() {
    let tasks = []
    let lis = document.getElementsByClassName("li");
    let task_name = document.getElementsByClassName("task");
    let checkbox = document.getElementsByClassName("checkbox");
    for (let i = 0; i < lis.length; i++) {
        tasks.push([]);
        tasks[tasks.length - 1].push([],[]);
        tasks[tasks.length - 1][0] = checkbox[i].checked;
        tasks[tasks.length - 1][1] = task_name[i].innerHTML;
    }
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(JSON.stringify(tasks));
}

// Loading stored tasks on startup
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(taskList);
for (let taskListElement of taskList) {
    let newLi = document.createElement("li");
    newLi.classList.add("li");
    let newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type","checkbox");
    newCheckbox.classList.add("checkbox");
    newCheckbox.checked = taskListElement[0];
    newCheckbox.addEventListener("change",get_tasks);
    let newTask = document.createElement("span");
    newTask.innerHTML = taskListElement[1];
    newTask.classList.add("task")
    let newDelBtn = document.createElement("button");
    newDelBtn.innerHTML = "Delete";
    newDelBtn.classList.add("delete-btn");
    newDelBtn.addEventListener("click", function () {
        newLi.remove();
        get_tasks();
    })
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newTask);
    newLi.appendChild(newDelBtn);
    list.appendChild(newLi);
}

