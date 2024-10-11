export default class Task {
    constructor(title, dueDate, priority){
        this.title=title;
        this.dueDate=dueDate;
        this.priority=priority;
    }
    getTask(){
        return this.title;
    }
    setTaskTitle(title){
        this.title=title;
    }
    setTaskdueDate(date){
        this.dueDate=date;
    }
    setTaskPriority(priority){
        this.priority=priority;
    }
}