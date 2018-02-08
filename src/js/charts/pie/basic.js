import Plotly from 'npm/plotly.js/lib/core';
//import d3 from './charts/d3-commons';
import PieChart from './pie-chart';

const d3 = Plotly.d3;

export default class BasicPie extends PieChart{
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
    	const chartProps = {
    		type: 'pie'
    	}

   		const plotlyData = this.getPlotlyData(data,chartProps);
   		console.log("Basic Pie:",plotlyData);
	    const layout = {}
	    console.log("plotlyData:",plotlyData);
	    const plotlyConfig = {displayModeBar: false};
		Plotly.plot(gd, plotlyData, layout, plotlyConfig);
	}

}