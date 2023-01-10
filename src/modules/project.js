import { addToNavbar } from './domevents';
import { incrementNextProjectID, incrementNextToDoID, nextProjectID, projects } from '../index';
import { ToDo } from './todo';
import { save } from './storage';

export class Project{
  constructor(title, priority){
    this._title = title;
    this._priority = priority;
    this._todos = [];
    this._id = nextProjectID;
  }
  makeToDo(title, description, dueDate, priority, notes){
    let toDo;
    toDo = new ToDo(title, description, dueDate, priority, notes)
    console.log("adding toDo")
    console.log(toDo);
    this._todos.push(toDo);
    incrementNextToDoID();
  
    save();
  }
}

// Project.prototype.makeToDo = function(title, description, dueDate, priority, notes, isChecklist){
//   let toDo;
//   toDo = new ToDo(title, description, dueDate, priority, notes, isChecklist)
//   console.log("adding toDo")
//   console.log(toDo);
//   this._todos.push(toDo);
//   incrementNextToDoID();

//   save();
// }

export function makeProject (title, priority){  
  let project;

  project = new Project(title, priority);

  console.log("adding project")
  console.log(project);
  projects.push(project);
  incrementNextProjectID();
  addToNavbar(project);
  save();
  return(project);
}