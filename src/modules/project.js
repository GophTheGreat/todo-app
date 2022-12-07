import { addToNavbar } from './domevents';
import { projectIDs, projects } from '../index';
import { ToDo } from './todo';

export class Project{
  constructor(title, priority){
    this._title = title;
    this._priority = priority;
    this._todos = [];

    this._projectID = 0;
    let i = 0;
    while(this._projectID === projectIDs[i]){
      this._projectID++;
    }
    projectIDs[i] = this._projectID;
  }
}

Project.prototype.makeToDo = function(title, description, dueDate, priority, notes, isChecklist){
  let toDo;
  toDo = new ToDo(title, description, dueDate, priority, notes, isChecklist)
  console.log("adding toDo")
  console.log(toDo);
  this._todos.push(toDo);
}

export function makeProject (title, priority){  
  let project;

  project = new Project(title, priority);

  console.log("adding project")
  console.log(project);
  addToNavbar(project);
  projects.push(project);
  return(project);
}