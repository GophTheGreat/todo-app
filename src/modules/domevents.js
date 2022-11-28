import { Project } from './project';
import { makeProject } from './project';
import { Task } from './todo';

console.log('hi');
export function addToSidebar(project){
  //create divs for all project pieces
  let projectDiv = document.createElement("div")
  projectDiv.id = project._title;

  let title = document.createElement("div")
  title.innerHTML = project._title;
  projectDiv.appendChild(title);

  let priority = document.createElement("div")
  priority.innerHTML = project._priority;
  projectDiv.appendChild(priority);

  let navBar = document.getElementById("navbar")
  navBar.appendChild(projectDiv);
  console.log("Added" + {project});
}

export const DOM_INITIALIZE = () => {
  let button = document.getElementById("addProject");
  console.log(button);
  button.addEventListener("click", () => {
    showProjectForm();
    makeProject('title', 'priority');
    console.log("did thing");
  });
}

function showProjectForm(){
  let form = document.createElement("form");
  
  let header = document.craeateElement("h2");
  header.innerHTML = "New Project";
  
  let titleLabel = document.createElement("label")
  titleLabel.innerHTML = "Title"
  titleLabel.name = "title"
  let title = document.createElement("input");
  input.type = "text";
}
