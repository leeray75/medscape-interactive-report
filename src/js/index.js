import {HorizontalBar, VerticalBar} from './charts/bar'
import Plotly from 'npm/plotly.js/lib/core';

const primaryGroup = "gender";
const groupName = "specialty"
fetch("data-all.json").then(
(response)=>{
  return(response.json())

},
(error)=>{
  console.error("Error:",error)
  throw error;
}
).then((data)=>{
	console.log("Data:",data);
	window.data = data;
	let plotData = [];
	if(groupName!=null && groupName.length>0){
		plotData = Plotly.d3.nest()
		  .key(function(d) { return d[groupName]; })
		  .entries(data);
		plotData = plotData.map( (data)=>{
			return({
				key: data.key,
				values: Plotly.d3.nest()
					.key((d)=>{ return d[primaryGroup]; })
					.rollup( (v)=>{ 
						return d3.sum(v, (d)=>{ return isNaN(d.values) ? 1 : d.values})
					})
					.entries(data.values)
			})
		})

	}
	else{
		plotData = Plotly.d3.nest()
		.key((d)=>{ return d[primaryGroup]; })
		.rollup( (v)=>{ 
			return d3.sum(v, (d)=>{ return d.values})
		})
		.entries(data);
	}


	console.log("PlotData:",plotData);
    const verticalEl = document.getElementById('vertical-chart');
    const horizontalEl = document.getElementById('horizontal-chart');
 	const vChart = new VerticalBar(plotData,verticalEl);
 	const hChart = new HorizontalBar(plotData,horizontalEl);
 	vChart.render();
 	hChart.render();

    //mainEl.append(chart.render())
})