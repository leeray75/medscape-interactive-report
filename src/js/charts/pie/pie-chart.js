import Plotly from 'npm/plotly.js/lib/core';
//import d3 from './charts/d3-commons';
import ResponsiveChart from 'app/charts/responsive-chart';
import TraceData from './trace-data';
const d3 = Plotly.d3;
export default class PieChart extends ResponsiveChart{
	constructor(){
		super();
		//this.el = this.el || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el = this.el || document.createElement('figure');
		this.colors = [];
	}

	initColors(plotlyData){
		console.log("color:",this.colors);
	    plotlyData.forEach( (plotData)=>{
	    	const colors = this.colors.filter( (color)=>{
	    		return plotData.name.toLowerCase()==color.grouping.toLowerCase();
	    	})
	    	plotData.marker.color = plotData.x.map( (name,i)=>{
	    		const colorObj = colors.find( (color)=>{
		    		if(color.hasOwnProperty('primaryGroup') && name.toLowerCase()==color.primaryGroup.toLowerCase()){
		    			return true;
		    		}
		    		else if(!color.hasOwnProperty('primaryGroup') && plotData.name.toLowerCase()==color.grouping.toLowerCase()){
		    			return true;
		    		}
		    		return false
	    		})
	    		return colorObj!=null ? colorObj.value : undefined;

	    	})
	    })		
	}
	setColors(colorsConfig=[]){

		this.colors = colorsConfig.sort( (color)=>{
			return color.hasOwnProperty('primaryGroup') ? -1 : 1;
		});

	}
	drawChart(){
		console.warn("'drawChart()' method must be implemented in the child class")
	}
	getPlotlyData(data=[],chartProps){
		const plotlyData = [];
		console.log("data:",data);
		if(Array.isArray(data[0].values)){
	    	data.forEach( (groupData)=>{
	    		const traceData = new TraceData(groupData,chartProps);
	    		plotlyData.push(traceData)
	    	})
		}
		else{
			console.log("Not Array");
			const groupData = {
				key: "",
				values: data
			}
			const traceData = new TraceData(groupData,chartProps);
			plotlyData.push(traceData)
		}
		return plotlyData;
				
	}
	render(){
		this.containerEl.appendChild(this.el);
		this.drawChart(this.el);
	}
}