import { DOM_INITIALIZE } from './modules/domevents';
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
  activeProject = makeProject("Default", 10);
}

init();

export function incrementNextProjectID(){
  nextProjectID++;
}

export function incrementNextToDoID(){
  nextToDoID++;
}