import project from "./Project.js";
import Task from "./Task.js";

let tab = [];
let Inbox = new project("Inbox");
let Today = new project("Today");
let thisWeek = new project("thisWeek");
let Default = new project("Default");
let Gym = new project("Gym");

tab.push(Inbox);
tab.push(Today);
tab.push(thisWeek);
tab.push(Default);
tab.push(Gym);

class UI {
  static loadElements() {
    UI.getLocalStorage();
    UI.loadProjects();
    UI.initProjectsAddButtons();
    UI.initBasicButtons();
    UI.getProject(Inbox);
  }
  static setLocalStorage() {
    console.log(tab);
    tab[0] = Inbox;
    console.log(tab);
    localStorage.setItem("tab", JSON.stringify(tab));
  }
  static getLocalStorage() {
    let storage = localStorage.getItem("tab");
    if (storage !== null) {
      let tempTab = JSON.parse(storage);
      tab = tempTab.map((projectData) => {
        let newProject = new project(projectData.name);
        projectData.tasks.forEach((task) => {
          const newTask = new Task(task.title, task.dueDate, task.priority);
          newProject.tasks.push(newTask);
        });
        return newProject;
      });
    }
  }
  static loadProjects() {
    let projectslist = document.getElementById("projects-list");
    projectslist.innerHTML = "";
    tab.forEach((element) => {
      if (["Inbox", "Today", "thisWeek"].includes(element.name)) {
        return;
      }
      let projectname = document.createElement("button");
      projectname.innerHTML = `<i class="fa-brands fa-elementor"></i> ${element.name} `;
      projectname.classList.add("project-name-button");
      projectname.addEventListener("click", () => {
        UI.getProject(element);
      });
      projectslist.appendChild(projectname);
    });
  }
  static initBasicButtons() {
    let inbox = document.querySelector(".inbox-button");
    let today = document.querySelector(".today-button");
    let thisweek = document.querySelector(".thisweek-button");
    inbox.addEventListener("click", () => UI.getProject(Inbox));
    today.addEventListener("click", () => UI.getProject(Today));
    thisweek.addEventListener("click", () => UI.getProject(thisWeek));
  }
  static initProjectsAddButtons() {
    let addProjectButton = document.querySelector(".add-project");
    let projectPopupSubmitBtn = document.getElementById("popupsubmitbutton");
    let projectPopupCloseBtn = document.getElementById("popupclosebutton");
    let addProjectPopup = document.getElementById("addprojectpopup");
    addProjectButton.addEventListener("click", () => {
      UI.closePopups();
      addProjectButton.classList.add("popup-close");
      addProjectPopup.classList.remove("popup-close");
      popupinput.value = "";
    });
    projectPopupSubmitBtn.addEventListener("click", () => {
      if (popupinput.value.length < 3) {
        alert("Too short name");
      } else {
        tab.push(new project(popupinput.value));
        UI.setLocalStorage();
        UI.loadProjects();
        UI.closePopups();
      }
    });
    projectPopupCloseBtn.addEventListener("click", UI.closePopups);
  }
  static closePopups() {
    document.getElementById("addprojectpopup").classList.add("popup-close");
    document.querySelector(".add-project").classList.remove("popup-close");
    document.getElementById("addtaskpopup")?.classList.add("popup-close");
    document.querySelectorAll(".inputTask").forEach((input) => {
      input.classList.add("closed");
    });
    document.querySelectorAll(".elementtitle").forEach((element) => {
      element.classList.remove("closed");
    });
    document.querySelector(".add-task")?.classList.remove("popup-close");
    document.querySelectorAll(".dateinput").forEach((date) => {
      date.classList.add("closed");
    });
    document.querySelectorAll(".datetext").forEach((datetext) => {
      datetext.classList.remove("closed");
    });
  }
  static initTaskAddButtons(projectName) {
    let addtaskbutton = document.querySelector(".add-task");
    let addtaskpopup = document.getElementById("addtaskpopup");
    let popuptasksubmitbutton = document.getElementById(
      "popuptasksubmitbutton"
    );
    let popuptaskclosebutton = document.getElementById("popuptaskclosebutton");
    let popuptaskinput = document.getElementById("popuptaskinput");
    addtaskbutton.addEventListener("click", () => {
      UI.closePopups();
      addtaskbutton.classList.add("popup-close");
      addtaskpopup.classList.remove("popup-close");
    });
    popuptasksubmitbutton.addEventListener("click", () => {
      if (popuptaskinput.value < 1) {
        alert("Cant be empty");
        return;
      }

      projectName.addTask(popuptaskinput.value);
      console.log(popuptaskinput.value);
      console.log(projectName);
      console.log(tab);
      UI.setLocalStorage();
      UI.getProject(projectName);
    });
    popuptaskclosebutton.addEventListener("click", UI.closePopups);
  }
  static initTaskButtonsListeners(projectName) {
    let tasktitle = document.querySelectorAll(".elementtitle");
    let deletetask = document.querySelectorAll(".deletetask");
    let dateinput = document.querySelectorAll(".datetext");
    let priorities = document.querySelectorAll(".priority");

    tasktitle.forEach((title) => {
      title.addEventListener("click", function () {
        UI.renameTask(projectName, title);
      });
    });
    deletetask.forEach((element) => {
      element.addEventListener("click", (e) => {
        console.log("Task delete button clicked:", e.target.dataset.index);
        UI.deleteTask(projectName, e);
      });
    });
    dateinput.forEach((date) => {
      date.addEventListener("click", function () {
        UI.changeDate(projectName, date);
      });
    });
    priorities.forEach((priority) => {
      priority.addEventListener("click", function () {
        UI.changePriority(projectName, priority);
      });
    });
    /////DO EDYCJI
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        UI.closePopups();
      }
    });
    ///////////
  }
  static changePriority(projectName, elementpr) {
    let id = elementpr.dataset.index;
    projectName.tasks[id].priority = !projectName.tasks[id].priority;
    UI.getProject(projectName);
  }
  static changeDate(projectName, date) {
    UI.closePopups();
    let dateinput = document.createElement("input");
    dateinput.type = "date";
    dateinput.classList.add("dateinput");
    const parentNode = date.parentNode;
    parentNode.insertBefore(dateinput, parentNode.firstChild);
    date.classList.add("closed");
    dateinput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && dateinput.value != "") {
        projectName.tasks[date.dataset.index].setTaskdueDate(dateinput.value);
        UI.getProject(projectName);
      }
    });
  }
  static renameTask(projectName, title) {
    UI.closePopups();
    let inputTask = document.createElement("input");
    inputTask.type = "text";
    inputTask.classList.add("inputTask");
    inputTask.classList.remove("closed");
    const parentNode = title.parentNode;
    const newTitle = title.textContent;
    title.classList.add("closed");
    parentNode.insertBefore(inputTask, parentNode.firstChild);
    inputTask.focus();
    inputTask.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    inputTask.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const tempTask = projectName.findTask(newTitle);
        tempTask.setTaskTitle(inputTask.value);
        UI.getProject(projectName);
      }
    });
  }
  static deleteTask(projectName, e) {
    if (projectName === Today || projectName === thisWeek) {
      //szukanie we wszystkich projektach gdzie znajduje sie ten task
      const foundTask = tab.find((element) => {
        if (element.name === "Today" || element.name === "thisWeek") {
          return false;
        }
        return element.tasks.find((task) => {
          return projectName.tasks[e.target.dataset.index].title === task.title;
        });
      });
      foundTask.deleteTask(projectName.tasks[e.target.dataset.index].title);
    }
    projectName.deleteTask(projectName.tasks[e.target.dataset.index].title);
    UI.getProject(projectName);
  }
  static getProject(projectName) {
    console.log(tab);
    UI.setLocalStorage();
    if (projectName === Today) {
      Today.tasks = "";
      tab.forEach((element) => {
        if (element.name === "Today" || element.name === "thisWeek") {
          return;
        }
        let todayTab = element.todayTasks();
        todayTab.forEach((task) => {
          task.projectName = element.name;
        });
        Today.tasks = [...Today.tasks, ...todayTab];

        console.log(Today.tasks);
      });
    }
    if (projectName === thisWeek) {
      thisWeek.tasks = "";
      tab.forEach((element) => {
        if (element.name === "Today" || element.name === "thisWeek") {
          return;
        }
        console.log(element);
        let thisWeekTab = element.thisWeekTasks();
        thisWeekTab.forEach((task) => {
          task.projectName = element.name;
        });
        thisWeek.tasks = [...thisWeek.tasks, ...thisWeekTab];
      });
    }
    UI.loadTasks(projectName);
  }

  static loadTasks(projectName) {
    rightpanelheader.innerHTML = `<h3>${projectName.name}</h3>
            <div id="tasklist"></div>`;
    if (projectName.name !== "Today" && projectName.name !== "thisWeek") {
      rightpanelheader.innerHTML += `
        <button class="add-task">
                <i class="fa-solid fa-plus"></i>
                Add Task
        </button>
        <div id="addtaskpopup" class="popup-close">
        <input type="text" id="popuptaskinput"><br>
        <button type="button" id="popuptasksubmitbutton">Add</button>
        <button type="button" id="popuptaskclosebutton">Close</button>
    </div>`;
      UI.initTaskAddButtons(projectName);
    }
    let tasklist = document.getElementById("tasklist");
    projectName.tasks.forEach((element, index) => {
      console.log(element);
      let taskdiv = document.createElement("div");
      const classPriority = !element.priority
        ? "fa-regular fa-star priority"
        : "fa-solid fa-star priority";
      const className = !element.priority ? "taskdiv" : "taskdivpriority";
      let projectNameInfo =
        projectName.name === "Today" || projectName.name === "thisWeek"
          ? `(${element.projectName})`
          : "";
      taskdiv.classList.add(className);
      taskdiv.innerHTML = `
        <div id="left">
        <span class="elementtitle" dataindex="${index}">${element.title}</span>
        </div>
        <div id="mid">
        <span class="projectNameInfo">${projectNameInfo}</span>
        </div>
        <div id="right">
        <span class="datetext" data-index="${index}">${element.dueDate}</span>
        <span><i class="${classPriority}" data-index=${index}></i></span>
        <span><i class="fa-solid fa-xmark deletetask" data-index=${index}></i></span>
        </div>`;
      //innerHTML niezalecane ale w tym przypadku git
      tasklist.appendChild(taskdiv);
    });
    UI.initTaskButtonsListeners(projectName);
  }
}

document.addEventListener("DOMContentLoaded", UI.loadElements);
