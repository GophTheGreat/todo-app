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
}

export const DOM_INITIALIZE = () => {
  let button = document.getElementById("addProject");
  console.log(button);
  button.addEventListener("click", () => {
    showProjectForm();
    //makeProject('title', 'priority');
    console.log("did thing");
  });
}

function showProjectForm(){
  let form = document.createElement("form");
  
  let header = document.createElement("h2");
  header.innerHTML = "New Project";
  form.appendChild(header);
  
  let titleLabel = document.createElement("label")
  titleLabel.innerHTML = "Title"
  titleLabel.name = "title"
  form.appendChild(titleLabel)
  let title = document.createElement("input");
  title.type = "text";
  form.appendChild(title);

  let priorityLabel = document.createElement("label")
  priorityLabel.innerHTML = "priority"
  priorityLabel.setAttribute("for", "priority");
  form.appendChild(priorityLabel)
  let priority = document.createElement("input");
  priority.id = "priority"
  priority.type = "range";
  priority.min = "1";
  priority.max = "10";
  priority.value = "10";
  priority.setAttribute("onchange", "(function() {document.getElementById('priorityDisplay').innerHTML = document.getElementById('priority').value})();");
  console.log(priority);
  form.appendChild(priority);
  let priorityDisplay = document.createElement("label")
  priorityDisplay.id = "priorityDisplay";
  priorityDisplay.innerHTML = priority.value;
  priorityDisplay.setAttribute("for", "priority");
  form.appendChild(priorityDisplay);

  let submitProject = document.createElement("button");
  submitProject.innerHTML = "Submit";
  form.appendChild(submitProject);


  let navBar = document.getElementById("navbar")
  navBar.appendChild(form);
}

function updateRangeDisplay(value){
  console.log("changing to " + value);
  console.log(document.getElementById('priority'));
  console.log(document.getElementById('priorityDisplay'));
}