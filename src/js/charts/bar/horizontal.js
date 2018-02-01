import Plotly from 'npm/plotly.js/lib/core';
//import d3 from './charts/d3-commons';
import ResponsiveChart from 'app/charts/responsive-chart'
import getPlotlyData from './get-plotly-data';
import './scss/horizontal.scss';
const d3 = Plotly.d3;
export default class HorizontalBar extends ResponsiveChart{
	constructor(data,containerEl=document.body){
		super();
		this.getPlotlyData = getPlotlyData;
		this.data = data;
		this.containerEl=containerEl;
		//this.el = this.el || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el = this.el || document.createElement('figure');
		this.el.classList.add('horizontal-bar');
		
	}

	drawChart(){
		this.el.innerHTML='';
		const data = this.data;
		const gd = this.gd;
    	console.log("Data:",data);
    	const chartProps = {
    		orientation: 'h',
    		type: 'bar'
    	}

    	const plotlyData = this.getPlotlyData(data,chartProps);

	    let dummyEl = document.createElement('span');
	    dummyEl.style.display="inline-block";
	    let maxLabel = plotlyData[0].y.sort( (a,b)=>{
	    	return b.length - a.length;
	    })
	    dummyEl.innerHTML = maxLabel[0];
	    this.containerEl.appendChild(dummyEl);
	    let width = dummyEl.clientWidth;
	    this.containerEl.removeChild(dummyEl);

	    const layout = {
	    	margin:{
	    		l: width
	    	}
	    }
	    console.log("plotlyData:",plotlyData);
	    const plotlyConfig = {displayModeBar: false};
		Plotly.plot(gd, plotlyData, layout, plotlyConfig);
	}

	render(){
		this.containerEl.appendChild(this.el);
		this.drawChart(this.el);
	}
}