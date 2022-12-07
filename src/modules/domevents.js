import { Project } from './project';
import { makeProject } from './project';
import { makeToDo } from './todo';
import { activeProject } from '../index'
import { date } from '../index'
import { projects } from '../index'

console.log('hi');
export function addToNavbar(project){
  //create divs for all project pieces
  console.log("Adding project to navbar");
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

export function addToInbox(todo){
  //create divs for all ToDo pieces
  //constructor(title, description, dueDate, priority, notes, isChecklist){
  console.log("Adding ToDo to inbox");
  let todoDiv = document.createElement("div")
  todoDiv.id = todo._title;

  let title = document.createElement("div")
  title.innerHTML = todo._title;
  todoDiv.appendChild(title);

  let description = document.createElement("div")
  description.innerHTML = todo._description;
  todoDiv.appendChild(description);

  let dueDate = document.createElement("div")
  dueDate.innerHTML = todo._dueDate;
  todoDiv.appendChild(dueDate);

  let priority = document.createElement("div")
  priority.innerHTML = todo._priority;
  todoDiv.appendChild(priority);

  let notes = document.createElement("div")
  notes.innerHTML = todo._notes;
  todoDiv.appendChild(notes);

  let isCheckList = document.createElement("div")
  isCheckList.innerHTML = todo._isCheckList;
  todoDiv.appendChild(isCheckList);

  let inbox = document.getElementById("inbox")
  inbox.appendChild(todoDiv);
}

export const DOM_INITIALIZE = () => {
  //Initialize our buttons
  //Project Button
  let button = document.getElementById("addProject");
  console.log(button);
  button.addEventListener("click", () => {
    showProjectForm();
  });

  //set active project to the default

  //Todo Button
  button = document.getElementById("addToDo");
  console.log(button);
  button.addEventListener("click", () => {
    showToDoForm();
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
  priority.setAttribute("onchange", "updateRangeDisplay()");
  console.log(priority);
  form.appendChild(priority);
  let priorityDisplay = document.createElement("label")
  priorityDisplay.id = "priorityDisplay";
  priorityDisplay.innerHTML = priority.value;
  priorityDisplay.setAttribute("for", "priority");
  form.appendChild(priorityDisplay);

  let submitProject = document.createElement("button");
  submitProject.type = "button";
  submitProject.innerHTML = "Submit";
  submitProject.addEventListener("click", function(){makeProject(title.value, priority.value); console.log("submitted")});
  submitProject.addEventListener("click", function(){removeForm(form)});
  submitProject.addEventListener("click", updateNavbar);
  form.appendChild(submitProject);


  let navBar = document.getElementById("navbar")
  navBar.appendChild(form);
}

function showToDoForm(){
  let form = document.createElement("form");
  let defaultDate = date.getDay();

  form.innerHTML = `
    <h2>New Project</h2>
    <label for="title">Title<label>
    <input type="text" name="title" id="todoTitle" maxlength="80" value="Default">
    <label for="description">Description</label>
    <input type="text" name="Description" id="todoDescription" maxlength="500">
    <label for="dueDate">Due Date</label>
    <input type="datetime-local" name="dueDate" id="todoDueDate" value=${defaultDate}>
    <label for="priority">Priority</label>
    <input type="number" name="priority" id="todoPriority" value="10">
    <label for="notes">Notes</label>
    <input type="text" name="notes" id="todoNotes">
    <label for="isChecklist">Is this a checklist?</label>
    <input type="checkbox" name="isCheckList" id="todoChecklist">
  `

  let submitToDo = document.createElement("button");
  submitToDo.type = "button";
  submitToDo.innerHTML = "Submit";
  submitToDo.addEventListener("click", function(){activeProject.makeToDo(document.getElementById("todoTitle").value, 
                                                           document.getElementById("todoDescription").value,
                                                           document.getElementById("todoDueDate").value,
                                                           document.getElementById("todoPriority").value,
                                                           document.getElementById("todoNotes").value,
                                                           document.getElementById("todoChecklist").value); console.log("submitted")});
  submitToDo.addEventListener("click", function(){removeForm(form)});
  submitToDo.addEventListener("click", updateInbox);
  form.appendChild(submitToDo);

  let inbox = document.getElementById("inbox")
  inbox.appendChild(form);
}

function updateInbox(){
  let inbox = document.getElementById("inbox");

  //Clear the inbox first
  while(inbox.firstChild){
    inbox.removeChild(inbox.firstChild);
  }

  //Populate all the toDos of the active project
  activeProject._todos.forEach((element) => {addToInbox(element)});
  console.log("Words"+activeProject._todos);

  //Paint the 'New' button and give it a function
  inbox.appendChild(createAddToDoButton());
}

function createAddToDoButton(){
  console.log("creating addToDo button")
  let buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";

  let button = document.createElement("button");
  button.id = "addToDo";
  button.addEventListener("click", () => {
    showToDoForm();
  });

  buttonContainer.appendChild(button);
  return buttonContainer;
}

function updateNavbar(){
  let navbar = document.getElementById("navbar");

  //Clear the inbox first
  while(navbar.firstChild){
    navbar.removeChild(navbar.firstChild);
  }

  //Populate all the projects
  projects.forEach((element) => {addToNavbar(element)});
  console.log("Sentences"+projects);

  //Paint the 'New' button and give it a function
  navbar.appendChild(createAddProjectButton());
}

function createAddProjectButton(){
  console.log("creating addProject button")
  let buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";
  let button = document.createElement("button");
  button.id = "addProject";
  button.addEventListener("click", () => {
    showProjectForm();
  });
  buttonContainer.appendChild(button);
  return buttonContainer;
}


function removeForm(form){
  while(form.firstChild){
    form.removeChild(form.firstChild);
  }
  form.remove();
}

export function updateRangeDisplay(){
  document.getElementById('priorityDisplay').innerHTML = document.getElementById('priority').value;
}
