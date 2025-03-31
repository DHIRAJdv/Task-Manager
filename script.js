const taskTitleInput = document.getElementById("task-title");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const darkModeToggle = document.getElementById("dark-mode-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveDarkMode() {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add(task.completed ? "completed" : "");
        
        li.innerHTML = `
            <span>${task.title}</span>
            <button onclick="toggleComplete(${index})">✔</button>
            <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
        `;
        
        taskList.appendChild(li);
    });
}

function addTask() {
    const title = taskTitleInput.value.trim();
    if (!title) return;
    
    tasks.push({ title, completed: false });
    taskTitleInput.value = "";
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    saveDarkMode();
}

addTaskBtn.addEventListener("click", addTask);
darkModeToggle.addEventListener("click", toggleDarkMode);
document.body.classList.toggle("dark-mode", darkMode);

renderTasks();
