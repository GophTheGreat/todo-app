import { addToInbox } from "./domevents";

export class ToDo{
  constructor(title, description, dueDate, priority, notes, isChecklist){
    this._title = title;

    if(description){
      this._decription = description;
    }
    else{
      this._description = "";
    }

    this._dueDate = dueDate;
    this._priority = priority;
    this._notes = notes;
    this._isChecklist = isChecklist;
  }
  /* Implement what to do if it's a checklist */
}

export function makeToDo(title, description, dueDate, priority, notes, isChecklist){
  let toDo;
  toDo = new ToDo(title, description, dueDate, priority, notes, isChecklist)
  console.log("adding toDo")
  console.log(toDo);
  addToInbox(toDo);
}

export function makeProject (title, priority){  
  let project;

  project = new Project(title, priority);

  console.log("adding project")
  console.log(project);
  addToSidebar(project);

}