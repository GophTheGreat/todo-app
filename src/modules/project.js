import { addToSidebar } from './domevents';

export class Project{
  constructor(title, priority){
    this._title = title;
    this._priority = priority
  }
}

export function makeProject (title, priority){  
  let project;

  project = new Project(title, priority);

  console.log("adding project")
  addToSidebar(project);

}