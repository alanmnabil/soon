document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task");
  const taskList = document.getElementById("taskList");
  const addTaskButton = document.getElementById("addTask");

  function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
      const li = document.createElement("li");
      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
      li.innerHTML = `
            <span class="taskText">${taskText}</span>
            <span class="taskTime">${timeString}</span>
            <div class="buttons">
                <button class="complete">Selesai</button>
                <button class="delete">Hapus</button>
            </div>
        `;
      taskList.appendChild(li);
      taskInput.value = "";
      addDeleteListener(li);
      addCompleteListener(li);
    }
  }


  function addCompleteListener(li) {
    const completeButton = li.querySelector(".complete");
    completeButton.addEventListener("click", function () {
      li.classList.toggle("completed");
      const taskText = li.querySelector("span");
      taskText.style.textDecoration = li.classList.contains("completed") ? "line-through":"none";
      completeButton.style.display = 'none'; //membuat button selesai menghilang setelah di klik
    });
  }

  function addDeleteListener(li) {
    const deleteButton = li.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      li.classList.add("fade-out"); // Tambahkan kelas animasi fade-out
      setTimeout(function () {
        li.remove();
      }, 500);
    });
  }

  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") { 
      event.target.classList.toggle("completed");
    }
  });
});
