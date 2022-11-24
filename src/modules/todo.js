export class Task{
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
}

export function makeToDo(toDoParams){

}