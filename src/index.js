import { DOM_INITIALIZE } from './modules/domevents';
import { updateRangeDisplay } from './modules/domevents';
import { makeProject } from './modules/project';
import './style.css'

export let date = new Date();
export let projectIDs = [];
export let projects = [];
export let activeProject = makeProject("Default", "10");


window.updateRangeDisplay = updateRangeDisplay;

function init(){
  //put a default project in the left
  //put an example todo in the inbox


  DOM_INITIALIZE();
  projects[0] = activeProject;
}

init();
