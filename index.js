import task from './Task.js';
import project from './Project.js';

let tab = [];


class UI{

    static loadElements(){
        UI.loadProjects();
        UI.initButtons();
        UI.loadInbox();
    }

    static loadProjects(){
        let projectslist = document.getElementById("projects-list");
        tab.forEach((element)=>{
        let projectname = document.createElement("button");
        projectname.innerHTML=`<i class="fa-brands fa-elementor"></i> ${element.name} `
        projectname.classList.add("project-name-button");
        projectslist.appendChild(projectname);
    });
}

    static initButtons(){
        let popupdiv = document.createElement("div");
        let popupinput = document.createElement("input");
        let popupbuttoncreate = document.createElement("button");
        let popupbuttoncancel = document.createElement("button");
        popupdiv.append(popupinput, popupbuttoncreate, popupbuttoncancel);
        popupdiv.classList.add("popupdiv-closed");
        rightpanel.innerHTML=popupdiv;
        console.log(popupdiv)

        let inbox = document.querySelector(".inbox-button");
        inbox.addEventListener('click',UI.loadInbox);

        let today = document.querySelector(".today-button");
        let thisweek = document.querySelector(".thisweek-button");

      
        return popupdiv;
    }
    static loadInbox(){
        rightpanel.innerHTML=`<h1>Inbox</h1>`;
        let addTaskButton = document.createElement("button");
        addTaskButton.classList.add("addTaskButton");
        addTaskButton.innerHTML=`<i class="fa-solid fa-plus"></i>
        Add Task`;
        addTaskButton.addEventListener('click',()=>{
            popupdiv.classList.replace("popupdiv-closed","popupdiv-open");
            addTaskButton.replaceWith(popupdiv);
        });

        rightpanel.appendChild(addTaskButton);
    }



};



let Default = new project("Default");
let Test = new project("Test");
tab.push(Default);
tab.push(Test);

console.log(tab);

document.addEventListener('DOMContentLoaded', UI.loadElements)