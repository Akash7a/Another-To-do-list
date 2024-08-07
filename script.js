const body = document.body;
const form = document.querySelector("form");
const titleInput = document.querySelector("#title_input");
const sound = document.querySelector("#sound");

let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

const createTasks = () => {

    document.querySelectorAll(".task_container").forEach(task => task.remove());
    tasks.forEach((item, i) => {

        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task_container");

        const controlButtons = document.createElement("div");
        controlButtons.classList.add("control_btn");

        const checkBtn = document.createElement("i");
        checkBtn.classList.add("bi", item.completed ? "bi-check-circle-fill" : "bi-circle");

        const titleContainer = document.createElement("p");
        titleContainer.classList.add("title");
        titleContainer.textContent = `${i + 1}.${item.title}`;

        checkBtn.addEventListener("click", () => {
            completeTasks(i);
        });

        if (item.completed) {
            titleContainer.classList.add("completed");
        }
        const deleteBtn = document.createElement("i");
        deleteBtn.classList.add("bi", "bi-trash");
        deleteBtn.addEventListener("click", () => {
            removeTasks(i);
        });

        taskContainer.appendChild(titleContainer);
        controlButtons.appendChild(deleteBtn);
        controlButtons.appendChild(checkBtn);
        taskContainer.appendChild(controlButtons);
        body.appendChild(taskContainer);

    });
};

const completeTasks = (index) => {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTasks();
    if (tasks[index].completed) {
        const completedSound = new Audio("./complete.mp3");
        completedSound.play();
    }
};

const removeTasks = (index) => {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTasks();
    const deleteSound = new Audio("./delete.mp3");
    deleteSound.play();
}
const greet = () => {
    if (tasks.length === 5 && tasks.every(task => task.completed)) {
        const greetContainer = document.createElement("div");
        greetContainer.textContent = `Congratulations! You have completed 5 tasks. Greatness is coming, my friend. Do what is needed to be done. You are AMAZING!`;
        greetContainer.classList.add('greet_container');

        // Apply styles directly
        greetContainer.style.backgroundColor = "aqua";
        greetContainer.style.position = "fixed";
        greetContainer.style.top = "10px";
        greetContainer.style.width = "70vmin";
        greetContainer.style.left = "27%";
        greetContainer.style.borderRadius = "10px";
        greetContainer.style.padding = "10px";

        body.appendChild(greetContainer);
        setTimeout(() => {
            greetContainer.style.display = "none";
        }, 5000);
    }
};
greet(tasks.length);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    tasks.push({ title: titleInput.value, completed: false });
    titleInput.value = "";
    createTasks();
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const sound = new Audio("click_sound.mp3");
    sound.play();
});
createTasks();