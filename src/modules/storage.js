import {projects} from '../index'

export function save(){
  console.log("Saving!");

 let str = JSON.stringify(projects);
 console.log(str);

 localStorage.setItem('savedProjects', str);
}