import project from './Project.js';
import { format } from 'date-fns';
formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });

let tab = [];


class UI{

    static loadElements(){
        UI.loadProjects();
        UI.initProjectsAddButtons();
        UI.initBasicButtons();
        UI.loadInbox();
    }

    static loadProjects(){
        let projectslist = document.getElementById("projects-list");
        projectslist.innerHTML="";
        tab.forEach((element)=>{
            if(element.name=="Inbox") {return};
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
    static initProjectsAddButtons(){
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
            if(popupinput.value.length<3){
                alert("Too short name");
            }else{
            tab.push(new project(popupinput.value));
            UI.loadProjects();
            UI.closePopups();
            }
        })  
        projectPopupCloseBtn.addEventListener('click',UI.closePopups);
    }
    static closePopups(){
        document.getElementById("addprojectpopup").classList.add("popup-close");
        document.querySelector(".add-project").classList.remove("popup-close");
        document.getElementById("addtaskpopup").classList.add("popup-close");
        document.querySelectorAll(".inputTask").forEach((input)=>{
            input.classList.add("closed");
        });
        document.querySelectorAll(".elementtitle").forEach((element)=>{
            element.classList.remove("closed");
        });
        document.querySelector(".add-task").classList.remove("popup-close");
        document.querySelectorAll(".dateinput").forEach((date)=>{
            date.classList.add("closed");
        });
        document.querySelectorAll(".datetext").forEach((datetext)=>{
            datetext.classList.remove("closed");
        });
    }

    static loadInbox(){
        rightpanelheader.innerHTML="";
        rightpanelheader.innerHTML=`
        <h3>Inbox</h3>	
        <div id="inboxtasklist"></div>
        <button class="add-task">
                <i class="fa-solid fa-plus"></i>
                Add Task
        </button>
        <div id="addtaskpopup" class="popup-close">
        <input type="text" id="popuptaskinput"><br>
        <button type="button" id="popuptasksubmitbutton">Add</button>
        <button type="button" id="popuptaskclosebutton">Close</button>
    </div>`
    let inboxtasklist = document.getElementById("inboxtasklist");
    tab[0].tasks.forEach((element, index)=>{
        let taskdiv = document.createElement("div");
        const classPriority = !element.priority ? "fa-regular fa-star priority" : "fa-solid fa-star priority";
        const className = !element.priority ? "taskdiv" : "taskdivpriority";
        taskdiv.classList.add(className);
        taskdiv.innerHTML=`
        <div id="left">
        <span class="elementtitle" dataindex="${index}">${element.title}</span>
        </div>
        <div id="right">
        <span class="datetext" data-index="${index}">${element.dueDate}</span>
        <span><i class="${classPriority}" data-index=${index}></i></span>
        <span><i class="fa-solid fa-xmark deletetask" data-index=${index}></i></span>
        </div>`
        //innerHTML niezalecane ale w tym przypadku git
        inboxtasklist.appendChild(taskdiv);
    });
    UI.initTaskAddButtons();
    UI.initTaskButtonsListeners()
    }
    static initTaskAddButtons(){
        let addtaskbutton = document.querySelector(".add-task");
        let addtaskpopup = document.getElementById("addtaskpopup");
        let popuptasksubmitbutton = document.getElementById("popuptasksubmitbutton");
        let popuptaskclosebutton = document.getElementById("popuptaskclosebutton");
        let popuptaskinput = document.getElementById("popuptaskinput");
        addtaskbutton.addEventListener('click',()=>{
            UI.closePopups();
            addtaskbutton.classList.add("popup-close");
            addtaskpopup.classList.remove("popup-close");
        });
        popuptasksubmitbutton.addEventListener('click',()=>{
            if(popuptaskinput.value<1){alert("Cant be empty"); return }
            Inbox.addTask(popuptaskinput.value);
            UI.loadInbox();
        });
        popuptaskclosebutton.addEventListener('click',UI.closePopups);
    } 
    static initTaskButtonsListeners(){
        let tasktitle = document.querySelectorAll(".elementtitle");
        let deletetask = document.querySelectorAll(".deletetask");
        let dateinput = document.querySelectorAll(".datetext");
        let priorities = document.querySelectorAll(".priority");

        tasktitle.forEach((title)=>{
            title.addEventListener('click',function(){
                UI.renameTask(title)});
        });
        deletetask.forEach((element)=>{
            element.addEventListener('click',UI.deleteTask);
        });
        dateinput.forEach((date)=>{
            date.addEventListener('click',function(){
                UI.changeDate(date);
            });
        });
        priorities.forEach((priority)=>{
            priority.addEventListener('click',function(){
                UI.changePriority(priority);
            })
        })
        /////DO EDYCJI
        document.addEventListener("keydown",(event)=>{
            if(event.key==="Escape"){
                UI.closePopups();
            }
        })
        ///////////
    }
    static changePriority(elementpr){
        let id = elementpr.dataset.index;
        tab[0].tasks[id].priority=!tab[0].tasks[id].priority;
        UI.loadInbox();
    }
    static changeDate(date){
        UI.closePopups();
        let dateinput = document.createElement("input");
        dateinput.type="date";
        dateinput.classList.add("dateinput")
        const parentNode = date.parentNode;
        parentNode.insertBefore(dateinput, parentNode.firstChild);
        date.classList.add("closed");
        dateinput.addEventListener('keydown',(event)=>{
            if(event.key==="Enter" && dateinput.value!=""){
                tab[0].tasks[date.dataset.index].setTaskdueDate(dateinput.value);
                UI.loadInbox();
            }
        });      
    }
    static renameTask(title){
        UI.closePopups();
        let inputTask = document.createElement("input");
        inputTask.type="text";
        inputTask.classList.add("inputTask");
        inputTask.classList.remove("closed");
        const parentNode = title.parentNode;
        const newTitle = title.textContent;
        title.classList.add("closed");
        parentNode.appendChild(inputTask);
        inputTask.focus();
        inputTask.addEventListener('click', (event) => {
            event.stopPropagation();
          });
        inputTask.addEventListener('keydown',(event)=>{
            if(event.key==="Enter"){
                const tempTask = Inbox.findTask(newTitle);
               tempTask.setTaskTitle(inputTask.value);
               UI.loadInbox();
        }
        
        })
    }
    static deleteTask(e){        
        Inbox.deleteTask(Inbox.tasks[e.target.dataset.index].title)
        UI.loadInbox();
    }
    static loadToday(){
        rightpanelheader.innerHTML="";
        rightpanelheader.textContent=`Today`;
    }


 }




let Inbox = new project("Inbox");
let Default = new project("Default");
tab.push(Inbox);
tab.push(Default);

console.log(tab);

document.addEventListener('DOMContentLoaded', UI.loadElements)