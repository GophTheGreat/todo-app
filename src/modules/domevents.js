import { Project } from './project';
import { makeProject } from './project';
import { makeToDo } from './todo';
import { activeProject } from '../index'
import { date } from '../index'
import { projects } from '../index'
import {setActiveProject} from '../index'
import { save } from './storage';
import { comparePriority } from './sort';

console.log('hi');


export function addToNavbar(project) {
  //create divs for all project pieces
  console.log("Adding project to navbar");
  let projectDiv = document.createElement("div")
  projectDiv.id = project._title;
  projectDiv.addEventListener("click", function() { setActiveProject(project) });
  projectDiv.className = "projectDiv";
  projectDiv.classList.add(`priority${project._priority}`);

  let title = document.createElement("div")
  title.innerHTML = `Project: ${project._title}`;
  title.style.fontWeight = "bold";
  title.style.fontSize = "15px";
  projectDiv.appendChild(title);

  let priority = document.createElement("div")
  priority.innerHTML = "Priority: " + project._priority;
  projectDiv.appendChild(priority);

  let navBar = document.getElementById("navbar")
  navBar.appendChild(projectDiv);

  let deleteButton = document.createElement("button")
  deleteButton.className = "deleteButtonSmall";
  deleteButton.setAttribute("data-project-id", `${project._id}`);
  deleteButton.addEventListener("click", function () { deleteProject(this.getAttribute("data-project-id")) });
  navBar.appendChild(deleteButton);
}

export function addToInbox(todo) {
  let inbox = document.getElementById("inbox")

  //create divs for all ToDo pieces
  console.log("Adding ToDo to inbox");
  console.log(todo);
  let todoDiv = document.createElement("div")
  todoDiv.id = todo._title;
  todoDiv.className = "todoDiv";
  todoDiv.classList.add(`priority${todo._priority}`);

  let deleteButton = document.createElement("button")
  deleteButton.className = "deleteButton";
  deleteButton.setAttribute("data-ToDo-id", `${todo._id}`);
  deleteButton.addEventListener("click", function () { deleteToDo(this.getAttribute("data-ToDo-id")) });
  todoDiv.appendChild(deleteButton);

  let title = document.createElement("div")
  title.innerHTML = todo._title;
  title.classList = "todoTitle";
  todoDiv.appendChild(title);

  if(todo._description != ""){
    let description = document.createElement("div")
    description.innerHTML = todo._description;
    todoDiv.appendChild(description);
  }

  let dueDate = document.createElement("div")
  dueDate.innerHTML = todo._dueDate;
  dueDate.classList = "todoDueDate";
  todoDiv.appendChild(dueDate);

  let priority = document.createElement("div")
  priority.innerHTML = todo._priority;
  todoDiv.appendChild(priority);

  let notes = document.createElement("div")
  notes.innerHTML = todo._notes;
  todoDiv.appendChild(notes);

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

function showProjectForm() {
  let form = document.createElement("form");
  form.className = "projectForm";
  form.style.height = "fit-content"

  let header = document.createElement("h2");
  header.innerHTML = "New Project";
  form.appendChild(header);

  let titleLabel = document.createElement("label")
  titleLabel.innerHTML = "Title"
  titleLabel.name = "title"
  form.appendChild(titleLabel)
  let title = document.createElement("input");
  title.type = "text";
  title.size = '15';
  form.appendChild(title);

  let priorityLabel = document.createElement("label")
  priorityLabel.innerHTML = "Priority:"
  priorityLabel.style.fontWeight = "bold";
  priorityLabel.style.fontSize = "15px";
  priorityLabel.style.display = "flex";

  let priorityLabel2 = document.createElement("label")
  priorityLabel2.innerHTML = "(Lower = More Urgent)"
  priorityLabel.setAttribute("for", "priority");
  form.appendChild(priorityLabel)
  form.appendChild(priorityLabel2)
  let priority = document.createElement("input");
  priority.id = "priority"
  priority.type = "range";
  priority.min = "1";
  priority.max = "10";
  priority.value = "5";
  priority.setAttribute("oninput", "updateRangeDisplay()");
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
  submitProject.addEventListener("click", function () { makeProject(title.value, priority.value); console.log("submitted") });
  submitProject.addEventListener("click", function () { removeForm(form) });
  submitProject.addEventListener("click", updateNavbar);
  form.appendChild(submitProject);


  let navBar = document.getElementById("navbar")
  navBar.appendChild(form);
}

function showToDoForm() {
  let form = document.createElement("form");
  let defaultDate = date.getDay();

  console.log("Active project is: ");
  console.log(activeProject);
  console.log(Object.getOwnPropertyNames(activeProject));
  console.log(Project.prototype);
  console.log(activeProject.__proto__);

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
  `

  let submitToDo = document.createElement("button");
  submitToDo.type = "button";
  submitToDo.innerHTML = "Submit";
  submitToDo.addEventListener("click", function () {
    makeToDo(activeProject._id, 
    document.getElementById("todoTitle").value,
    document.getElementById("todoDescription").value,
    document.getElementById("todoDueDate").value,
    document.getElementById("todoPriority").value,
    document.getElementById("todoNotes").value);
  });
  submitToDo.addEventListener("click", function () { removeForm(form) });
  submitToDo.addEventListener("click", updateInbox);
  form.appendChild(submitToDo);

  let inbox = document.getElementById("inbox")
  inbox.appendChild(form);
}

export function updateInbox() {
  let inbox = document.getElementById("inbox");
  activeProject._todos.sort(comparePriority);

  //Clear the inbox first
  while (inbox.firstChild) {
    inbox.removeChild(inbox.firstChild);
  }

  //Populate all the toDos of the active project
  activeProject._todos.forEach((element) => { addToInbox(element) });
  console.log("Words" + activeProject._todos);

  //Paint the 'New' button and give it a function
  inbox.appendChild(createAddToDoButton());
}

function removeElement(element){
  element.remove();
}

function createAddToDoButton() {
  console.log("creating addToDo button")
  let buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";

  let button = document.createElement("button");
  button.id = "addToDo";
  button.addEventListener("click", () => {
    showToDoForm();
  });
  button.addEventListener("click", () => {
    removeElement(button);
  });
  button.addEventListener("click", () => {
    removeElement(buttonContainer);
  });

  buttonContainer.appendChild(button);
  return buttonContainer;
}

export function updateNavbar() {
  projects.sort(comparePriority);

  let navbar = document.getElementById("navbar");

  //Clear the inbox first
  while (navbar.firstChild) {
    navbar.removeChild(navbar.firstChild);
  }

  //Populate all the projects
  projects.forEach((element) => { addToNavbar(element) });
  console.log(projects);

  //Set new active div
  updateActiveDiv();

  //Paint the 'New' button and give it a function
  navbar.appendChild(createAddProjectButton());
}

function updateActiveDiv(){
  let activeDiv = document.getElementsByClassName("activeDiv");
  if(!activeDiv){
    activeDiv = document.getElementById(activeProject._title);
    activeDiv.classList.add("activeDiv");
    return;
  }

  if(activeDiv.length > 0){
    activeDiv[0].classList.remove("activeDiv");
  }

  activeDiv = document.getElementById(activeProject._title);
  //Paint a new active div using the active project
  console.log("Setting new active div")
  console.log(activeProject);
  console.log(activeProject._title);

  activeDiv.classList.add("activeDiv");
}

function createAddProjectButton() {
  console.log("creating addProject button")
  let buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";
  let button = document.createElement("button");
  button.id = "addProject";
  button.addEventListener("click", () => {
    showProjectForm();
  });
  button.addEventListener("click", () => {
    removeElement(button);
  });
  button.addEventListener("click", () => {
    removeElement(buttonContainer);
  });
  buttonContainer.appendChild(button);
  return buttonContainer;
}

function removeForm(form) {
  while (form.firstChild) {
    form.removeChild(form.firstChild);
  }
  form.remove();
}

export function updateRangeDisplay() {
  document.getElementById('priorityDisplay').innerHTML = document.getElementById('priority').value;
}

function deleteToDo(id) {
  console.log(`Deleting ToDo of ID: ${id}`);
  //Find the index of the ToDo with the specified ID
  console.log(`Before: `)
  console.log(activeProject._todos);
  let indexToRemove = activeProject._todos.findIndex((item) => { console.log(`Comparing: ${item._id} and ${id}`); if (item._id === parseInt(id)) { return true; } else { return false; } });
  if (indexToRemove < 0) {
    console.log(`Not Found`);
    return;
  }

  console.log(`Found at index of ${indexToRemove}`);
  //Remove it
  activeProject._todos.splice(indexToRemove, 1);
  console.log(`After: `)
  console.log(activeProject._todos);

  //Update the inbox
  updateInbox();
  save();
}

export function findProject(id){
  let index = projects.findIndex((item) => { console.log(`Comparing: ${item._id} and ${id}`); if (item._id === parseInt(id)) { return true; } else { return false; } });
  if (index < 0) {
    console.log(`Not Found`);
    return null;
  }
  return index;
}

function deleteProject(id) {
  console.log(`Deleting Project of ID: ${id}`);
  //Find the index of the Project with the specified ID
  console.log(`Before: `)
  console.log(projects);
  console.log(`Before Active Project: `)
  console.log(activeProject);

  let indexToRemove = findProject(id);
  if (indexToRemove == null){
    return;
  }

  console.log(`Found at index of ${indexToRemove}`);
  //Remove it
  projects.splice(indexToRemove, 1);
  console.log(`After: `)
  console.log(projects);
  console.log(`After Active Project: `)
  console.log(activeProject);
  console.log(id);

  console.log(`Comparing ${activeProject._id} and ${id}`);

  if (parseInt(activeProject._id) === parseInt(id)){
    console.log("setting new activeProject")
    setActiveProject(projects[0]);
    updateActiveDiv();
  }

  //Update the Navbar
  updateNavbar();
  save();


}