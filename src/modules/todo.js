import { activeProject, nextToDoID, incrementNextToDoID } from "../index";
import { save } from "./storage";


export class ToDo{
  constructor(title, description, dueDate, priority, notes, isChecklist){
    this._title = title;

    if(description != ""){
      this._description = description;
    }
    else{
      this._description = "";
    }

    this._dueDate = dueDate;
    this._priority = priority;
    this._notes = notes;
    this._isChecklist = isChecklist;
    this._id = nextToDoID;
  }
  /* Implement what to do if it's a checklist */
}

export function makeToDo(projectid, title, description, dueDate, priority, notes){
  // let index = findProject(projectid);
  // if (index == null){
  //   console.log("No projects found. This shouldn't happen ever")
  //   return;
  // }
  
  let toDo;
  toDo = new ToDo(title, description, dueDate, priority, notes)
  console.log("adding toDo")
  console.log(toDo);
  activeProject._todos.push(toDo);
  incrementNextToDoID();

  save();
}