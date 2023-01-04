export function comparePriority(a, b){
  console.log("sorting!")
  if(parseInt(a._priority) < parseInt(b._priority)){
    return 1;
  }
  if(parseInt(a._priority) > parseInt(b._priority)){
    return -1;
  }
  
  return 0;
}

