import {projects} from '../index'

export function save(){
  console.log("Saving!");
  // let str = JSON.stringify(projects, (value) => {
  //   if (typeof value === 'function') {
  //     return value.toString();
  //   }
  //   return value;
  // })

 let str = JSON.stringify(projects);
 console.log(str);

 str = JSON.stringify(projects, (key, value) => {
  if (typeof value === 'function') {
    return value.toString();
  }
  return value;
});

  console.log(str);


  // let stringifiedProjects = JSON.stringify(projects, (key, value) => {
  //   if (typeof value === 'function') {
  //     return value.toString();
  //   }
  //   return value;
  // });
  // localStorage.setItem('savedProjects', stringifiedProjects);
  // console.log(projects);
  // console.log(localStorage.getItem('savedProjects'));
  // console.log('saved!');
}

