import { DOM_INITIALIZE, updateNavbar, updateInbox } from './modules/domevents';
import { updateRangeDisplay } from './modules/domevents';
import { makeProject } from './modules/project';
import './style.css'

export let date = new Date();
export let nextProjectID = 0;
export let projects = [];
export let activeProject;

export let nextToDoID = 0;


window.updateRangeDisplay = updateRangeDisplay;

function init(){
  //put a default project in the left
  //put an example todo in the inbox


  DOM_INITIALIZE();
  if(!localStorage.getItem('savedProjects')) {
   setActiveProject(makeProject("Default", 10));
   console.log("Fresh Project!")
  }
  else {
    console.log("Pulling from storage!")
    console.log(localStorage.getItem('savedProjects'))
    projects = JSON.parse(localStorage.getItem('savedProjects'));
    setActiveProject(projects[0]);
  }
  updateNavbar();
}

init();

export function incrementNextProjectID(){
  nextProjectID++;
}

export function incrementNextToDoID(){
  nextToDoID++;
}

export function setActiveProject(project){
  activeProject = project;
  updateNavbar();
  updateInbox();
}