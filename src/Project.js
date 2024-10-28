import tasks from './Task.js';
import { format } from 'date-fns';

export default class Project{ 

constructor(name){
this.name=name;
this.tasks = [];
}

setName(name){
    this.name=name;
}
getName(){
    return this.name;
}
getTasks(){
    return this.tasks;
}
addTask(task){
    if(this.tasks.find(element => element.title === task)) return 
    this.tasks.push(new tasks(task, "No date", 0));
    console.log(this);
}
deleteTask(task){
    this.tasks = this.tasks.filter((element) => element.title !== task);
}
findTask(task){
    return this.tasks.find(element => 
        element.title.trim() === task.trim()
    );
}
todayTasks(){
    const now = new Date();
    const formattedDate = format(now, 'yyyy-MM-dd');
    let today = this.tasks.filter(task=>task.dueDate===formattedDate);
    return today;
}
thisWeekTasks(){
    const now = new Date();
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; 
    let thisWeek = this.tasks.filter(task=>{
        let taskDueDate = new Date(task.dueDate);
        let timeDifference = taskDueDate.getTime()-now.getTime()
        return timeDifference<=oneWeekInMilliseconds && timeDifference>0 });
    return thisWeek;
}

}