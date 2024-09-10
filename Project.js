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
    if(this.tasks.find(element => element === task)) return 
    this.tasks.push(task);
}
deleteTask(task){
    this.tasks = this.tasks.filter((element) => element.name !== task);
}

}