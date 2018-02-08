import Plotly from 'npm/plotly.js/lib/core';
//import d3 from './charts/d3-commons';
import BarChart from './bar-chart';
import './scss/vertical.scss';
const d3 = Plotly.d3;
window.d3 = d3;
export default class VerticalBar extends BarChart{
	constructor(data,containerEl=document.body){
		super();
		this.data = data;
		this.containerEl=containerEl;
		//this.el = this.el || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el = this.el || document.createElement('figure');
		this.el.classList.add('vertical-bar');
		this.colors = [];
		this.chartProps = {
    		orientation: 'v',
    		type: 'bar'

    	}
	}

	drawChart(){
		this.el.innerHTML='';
		const data = this.data;
		const gd = this.gd;
    	let chartProps = this.chartProps;

   		const plotlyData = this.getPlotlyData(data,chartProps);

	    const layout = {}
	    console.log("plotlyData:",plotlyData);
	    const plotlyConfig = {displayModeBar: false};

	    if(this.colors.length>0){
	    	this.initColors(plotlyData);
	    }

		Plotly.plot(gd, plotlyData, layout,plotlyConfig);
	}
	
}