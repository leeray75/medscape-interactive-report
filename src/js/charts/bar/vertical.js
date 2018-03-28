import Plotly from 'npm/plotly.js/lib/core';
//import d3 from './charts/d3-commons';
import BarChart from './bar-chart';
import './scss/vertical.scss';
const d3 = Plotly.d3;
window.d3 = d3;
export default class VerticalBar extends BarChart{
	constructor(data,containerEl=document.body,layout={}){
		super();
		this.data = data;
		this.containerEl=containerEl;
		this.layout = layout;
		//this.el = this.el || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el = this.el || document.createElement('figure');
		this.el.classList.add('vertical-bar');
		this.el.setAttribute('id','vertical-bar');
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

	    const layout = this.layout;
	    console.log("plotlyData:",plotlyData);
	    const plotlyConfig = {displayModeBar: false};

	    if(this.colors.length>0){
	    	this.initColors(plotlyData);
	    }


		Plotly.plot(gd, plotlyData, layout,plotlyConfig);
		gd.on('plotly_hover', function(data){
			console.log("hover data:",data)
		})
	}
	update(data){
		console.log("update:",data)
		const traces = data.keys();
		console.log("traces:",traces);
		Plotly.animate(this.gd, {
		    data: this.getPlotlyData(data,this.chartProps),
		    //traces: traces,
		    layout: {}
		  }, {
		    transition: {
		      duration: 500,
		      easing: 'linear'
		    }
		  }).then(function(){
		  	console.log("Done animate:",arguments)
		  })
	}
	
}