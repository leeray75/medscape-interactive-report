import Plotly from 'npm/plotly.js/lib/core';
//import d3 from './charts/d3-commons';
import ResponsiveChart from 'app/charts/responsive-chart';
import getPlotlyData from './get-plotly-data';
import './scss/vertical.scss';
const d3 = Plotly.d3;
window.d3 = d3;
export default class VerticalBar extends ResponsiveChart{
	constructor(data,containerEl=document.body){
		super();
		this.getPlotlyData = getPlotlyData;
		this.data = data;
		this.containerEl=containerEl;
		//this.el = this.el || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el = this.el || document.createElement('figure');
		this.el.classList.add('vertical-bar');
	}

	drawChart(){
		this.el.innerHTML='';
		const data = this.data;
		const gd = this.gd;
    	console.log("Data:",data);
    	const chartProps = {
    		orientation: 'v',
    		type: 'bar'
    	}
   		const plotlyData = this.getPlotlyData(data,chartProps);

	    const layout = {}
	    console.log("plotlyData:",plotlyData);
	    const plotlyConfig = {displayModeBar: false};
		Plotly.plot(gd, plotlyData, layout,plotlyConfig);
	}

	render(){
		this.containerEl.appendChild(this.el);
		this.drawChart(this.el);
		
	}
}