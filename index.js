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
        projectslist.innerHTML="";
        tab.forEach((element)=>{
        let projectname = document.createElement("button");
        projectname.innerHTML=`<i class="fa-brands fa-elementor"></i> ${element.name} `
        projectname.classList.add("project-name-button");
        projectslist.appendChild(projectname);
    });
}
 static getButtons() {
    return {
        inbox: document.querySelector(".inbox-button"),
        today: document.querySelector(".today-button"),
        addProjectButton: document.querySelector(".add-project"),
        projectPopupSubmitBtn: document.getElementById("popupsubmitbutton"),
        projectPopupCloseBtn: document.getElementById("popupclosebutton"),
        popupInput: document.getElementById("popupinput"),
        addProjectPopup: document.getElementById("addprojectpopup"),
        rightpanelheader: document.getElementById("rightpanelheader"),
    };
}
    static initButtons(){
        let buttons = UI.getButtons();
        buttons.inbox.addEventListener('click',UI.loadInbox);
        buttons.today.addEventListener('click',UI.loadToday);

        buttons.addProjectButton.addEventListener('click',()=>{
            buttons.addProjectButton.classList.toggle("popup-close");
            buttons.addProjectPopup.classList.toggle("popup-close");
            popupinput.value="";
        });
        buttons.projectPopupSubmitBtn.addEventListener('click',()=>{
            tab.push(new project(popupinput.value));
            UI.loadProjects();
            UI.closePopups();
        })  
        buttons.projectPopupCloseBtn.addEventListener('click',UI.closePopups);
    }
    static closePopups(){
        let addprojectpopup = document.getElementById("addprojectpopup");
        addprojectpopup.classList.toggle("popup-close");
        let addProjectButton = document.querySelector(".add-project");
        addProjectButton.classList.toggle("popup-close");

        let addtaskpopup = document.getElementById("addtaskpopup");
        // addtaskpopup.classList.toggle("popup-close");

    }
    static loadInbox(){
        rightpanelheader.innerHTML="";
        rightpanelheader.textContent=`Inbox`;
        

    }
    static loadToday(){
        rightpanelheader.innerHTML="";
        rightpanelheader.textContent=`Today`;
    }



};



let Default = new project("Default");
let Test = new project("Test");
tab.push(Default);
tab.push(Test);

console.log(tab);

document.addEventListener('DOMContentLoaded', UI.loadElements)