import Plotly from 'npm/plotly.js/lib/core';
const d3 = Plotly.d3;

const getPlotData = (data=[], config)=>{
	let plotData = null;
	const primaryGroup = config.primaryGroup;
	const grouping = config.hasOwnProperty('grouping') ? config.grouping : null;
	if(grouping!=null){
		const groupName = grouping.name;
		if(grouping.hasOwnProperty('type') && grouping.type=="percentage"){
			plotData = getGroupingPercentage(grouping.value,data);
		}
		else{

			plotData = d3.nest()
			  .key(function(d) { return d[groupName]; })
			  .entries(data);
			  console.log("plotData:",plotData);
			plotData = plotData.map( (data)=>{
				return({
					key: data.key,
					values: d3.nest()
						.key((d)=>{ return d[primaryGroup]; })
						.rollup( (v)=>{ 
							return d3.sum(v, (d)=>{ 
								return isNaN(d.values) ? 1 : d.values
							})
						})
						.entries(data.values)
				})
			})
		}

	}
	else{
		plotData = d3.nest()
		.key((d)=>{ return d[primaryGroup]; })
		.rollup( (v)=>{ 
			return d3.sum(v, (d)=>{ return isNaN(d.values) ? 1 : d.values})
		})
		.entries(data);
	}

	return plotData;

}

const getGroupingPercentage = (_value,_data)=>{

}
export default getPlotData;