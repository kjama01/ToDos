import task from './Task.js';
import project from './Project.js';

let tab = [];


class UI{

    static loadElements(){
        UI.loadProjects();
        UI.initProjectsButtons();
        UI.initBasicButtons();
        UI.loadInbox();
    }

    static loadProjects(){
        let projectslist = document.getElementById("projects-list");
        projectslist.innerHTML="";
        tab.forEach((element)=>{
        let projectname = document.createElement("button");
        projectname.innerHTML=`<i class="fa-brands fa-elementor"></i> ${element.name} `
        projectname.classList.add("project-name-button");
        projectslist.appendChild(projectname);
    });
    }
    static initBasicButtons(){
        let inbox = document.querySelector(".inbox-button");
        let today = document.querySelector(".today-button");
        inbox.addEventListener('click',UI.loadInbox);
        today.addEventListener('click',UI.loadToday);
    }
    static initProjectsButtons(){
        let addProjectButton = document.querySelector(".add-project");
        let projectPopupSubmitBtn = document.getElementById("popupsubmitbutton");
        let projectPopupCloseBtn = document.getElementById("popupclosebutton");
        let addProjectPopup = document.getElementById("addprojectpopup");
        addProjectButton.addEventListener('click',()=>{
            UI.closePopups();
            addProjectButton.classList.add("popup-close");
            addProjectPopup.classList.remove("popup-close");
            popupinput.value="";
        });
        projectPopupSubmitBtn.addEventListener('click',()=>{
            tab.push(new project(popupinput.value));
            UI.loadProjects();
            UI.closePopups();
        })  
        projectPopupCloseBtn.addEventListener('click',UI.closePopups);
    }
    static closePopups(){
        document.getElementById("addprojectpopup").classList.add("popup-close");
        document.querySelector(".add-project").classList.remove("popup-close");
        document.getElementById("addtaskpopup").classList.add("popup-close");
        document.querySelector(".add-task").classList.remove("popup-close");
    }

    static loadInbox(){
        rightpanelheader.innerHTML="";
        rightpanelheader.innerHTML=`
        <h3>Inbox</h3>	
        <button class="add-task">
                <i class="fa-solid fa-plus"></i>
                Add Task
        </button>
        <div id="addtaskpopup" class="popup-close">
        <input type="text" id="popuptaskinput"><br>
        <button type="button" id="popuptasksubmitbutton">Add</button>
        <button type="button" id="popuptaskclosebutton">Close</button>
    </div>`
    UI.initTaskButtons();
    }
    static initTaskButtons(){
        let addtaskbutton = document.querySelector(".add-task");
        let addtaskpopup = document.getElementById("addtaskpopup");
        let popuptasksubmitbutton = document.getElementById("popuptasksubmitbutton");
        let popuptaskclosebutton = document.getElementById("popuptaskclosebutton");
        addtaskbutton.addEventListener('click',()=>{
            UI.closePopups();
            addtaskbutton.classList.add("popup-close");
            addtaskpopup.classList.remove("popup-close");
        });

        popuptaskclosebutton.addEventListener('click',UI.closePopups);
    }
    static loadToday(){
        rightpanelheader.innerHTML="";
        rightpanelheader.textContent=`Today`;
    }


 }





let Default = new project("Default");
let Test = new project("Test");
tab.push(Default);
tab.push(Test);

console.log(tab);

document.addEventListener('DOMContentLoaded', UI.loadElements)