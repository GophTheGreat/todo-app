import {projects} from '../index'

export function save(){
  localStorage.setItem('savedProjects', JSON.stringify(projects));
  console.log(projects);
  console.log(localStorage.getItem('savedProjects'));
  console.log('saved!');
}