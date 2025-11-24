// -------------------- Quotes --------------------
const quotes = [
    "Time is life — waste it wisely.",
    "Your day is your reflection.",
    "Small steps daily lead to big results.",
    "Time lost is never found again.",
    "Every minute shapes your future."
];

function changeQuote() {
    document.getElementById("quote").innerText =
        quotes[Math.floor(Math.random() * quotes.length)];
}
setInterval(changeQuote, 4000);
changeQuote();


// -------------------- Local Storage --------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateProgress();
}

function updateProgress() {
    let completed = tasks.filter(t => t.completed).length;
    let total = tasks.length;
    let percent = total === 0 ? 0 : (completed / total) * 100;

    document.getElementById("progress-bar").style.width = percent + "%";
}


// -------------------- Add Task --------------------
function addTask() {
    let text = document.getElementById("taskInput").value.trim();
    if (!text) return;

    tasks.push({ text, completed: false });
    document.getElementById("taskInput").value = "";
    renderTasks();
    saveTasks();
}


// -------------------- Render --------------------
function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            ${task.text}
            <div class="icons">
                <span onclick="toggle(${index})">✔</span>
                <span onclick="editTask(${index})">✎</span>
                <span onclick="removeTask(${index})">❌</span>
            </div>
        `;
        list.appendChild(li);
    });

    updateProgress();
}


// -------------------- Actions --------------------
function toggle(i) {
    tasks[i].completed = !tasks[i].completed;
    renderTasks();
    saveTasks();
}

function editTask(i) {
    let newText = prompt("Edit task:", tasks[i].text);
    if (newText && newText.trim() !== "") {
        tasks[i].text = newText;
        renderTasks();
        saveTasks();
    }
}

function removeTask(i) {
    tasks.splice(i, 1);
    renderTasks();
    saveTasks();
}

function clearAll() {
    tasks = [];
    renderTasks();
    saveTasks();
}

renderTasks();


// -------------------- Stopwatch --------------------
let stopwatchInterval;
let stopwatchTime = 0;

function formatTime(t) {
    let h = String(Math.floor(t / 3600)).padStart(2, "0");
    let m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
    let s = String(t % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

function startStopwatch() {
    if (stopwatchInterval) return;
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        document.getElementById("stopwatch").innerText = formatTime(stopwatchTime);
    }, 1000);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchTime = 0;
    document.getElementById("stopwatch").innerText = "00:00:00";
}


// -------------------- Countdown Timer --------------------
let timerInterval;

function startTimer() {
    let seconds = parseInt(document.getElementById("timerInput").value);

    if (isNaN(seconds) || seconds <= 0) return;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timerInterval);
            alert("⏳ Time's up!");
        }

        let m = String(Math.floor(seconds / 60)).padStart(2, "0");
        let s = String(seconds % 60).padStart(2, "0");

        document.getElementById("countdown").innerText = `${m}:${s}`;
        seconds--;
    }, 1000);
}
