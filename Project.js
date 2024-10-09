import tasks from './Task.js';
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
}
deleteTask(task){
    this.tasks = this.tasks.filter((element) => element.title !== task);
}
findTask(task){
    return (this.tasks.find(element => element.title === task));
}


}