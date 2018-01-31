import {HorizontalBar, VerticalBar} from './charts/bar'

fetch("data.json").then(
(response)=>{
  return(response.json())

},
(error)=>{
  console.error("Error:",error)
  throw error;
}
).then((data)=>{
    const verticalEl = document.getElementById('vertical-chart');
    const horizontalEl = document.getElementById('horizontal-chart');
 	const vChart = new VerticalBar(data,verticalEl);
 	const hChart = new HorizontalBar(data,horizontalEl);
 	vChart.render();
 	hChart.render();

    //mainEl.append(chart.render())
})