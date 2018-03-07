import Plotly from 'npm/plotly.js/lib/core';
//import d3 from './charts/d3-commons';
import PieChart from './pie-chart';

const d3 = Plotly.d3;

export default class SubplotsPie extends PieChart{
	constructor(data,containerEl=document.body){
		super();
		this.data = data;
		this.containerEl=containerEl;
		//this.el = this.el || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el = this.el || document.createElement('figure');
		this.el.classList.add('basic-pie');
	}

	drawChart(){
		this.el.innerHTML='';
		const data = this.data;
		const gd = this.gd;
    	console.log("Data:",data);


   		const plotlyData = this.getPlotlyData(data);
   		console.log("Subplots Pie:",plotlyData);
	    const layout = { title: 'Specialty By Gender'}
	    console.log("plotlyData:",plotlyData);
	    const plotlyConfig = {displayModeBar: false};
	    let width = (1/plotlyData.length)-.05;
	    plotlyData.forEach( (data,index)=>{
    		let start = (width*index)+.05;
    		let end =  (width*(index+1));
    		data.domain = {
    			x: [start,end],
    			y: [0,1]
    		},
    		data.hoverinfo = 'name' ;	
    		data.title = 'test';
	    })
		Plotly.plot(gd, plotlyData, layout, plotlyConfig);
	}

}