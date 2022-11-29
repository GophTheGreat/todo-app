import { DOM_INITIALIZE } from './modules/domevents';
import { updateRangeDisplay } from './modules/domevents';
import './style.css'

window.updateRangeDisplay = updateRangeDisplay;

function init(){
  //put a default project in the left
  //put an example todo in the inbox


  DOM_INITIALIZE();
}

init();
