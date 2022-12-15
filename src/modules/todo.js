import { activeProject, nextToDoID } from "..";
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
    this._id = nextToDoID;
  }
  /* Implement what to do if it's a checklist */
}

