import {HorizontalBar} from './charts/bar'
fetch("data.json").then(
(response)=>{
  return(response.json())

},
(error)=>{
  console.error("Error:",error)
  throw error;
}
).then((data)=>{
    const mainEl = document.getElementsByTagName('main')[0];
    data.forEach( (data)=>{
      data.name = `${data.name} - ${data.value}%`;
    })
    const horizontalBar = new HorizontalBar(mainEl,data);
    mainEl.append(horizontalBar.render())
})