import { Project } from './project';
import { makeProject } from './project';
import { Task } from './todo';

console.log('hi');
export function addToSidebar(project){
  //create divs for all project pieces
  let projectDiv = document.createElement("div")
  projectDiv.id = project.title;

  let title = document.createElement("div")
  title.innerHTML = project.title;
  projectDiv.appendChild(title);

  let priority = document.createElement("div")
  priority.innerHTML = project.priority;
  projectDiv.appendChild(priority);

  let navBar = document.getElementById("navbar")
  navBar.appendChild(projectDiv);
  console.log("Added" + {project});
}

export const DOM_INITIALIZE = () => {
  let button = document.getElementById("addProject");
  console.log(button);
  button.addEventListener("click", () => {
    makeProject('title', 'priority');
    console.log("did thing");
  });
}
