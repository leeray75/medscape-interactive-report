import Plotly from 'npm/plotly.js/lib/core';
const d3 = Plotly.d3;

const getPlotDataByPercentage = function(config){
	const promise = new Promise((resolve,reject)=>{

		const data = this.data;
		let plotData = null;
		const primaryGroup = config.primaryGroup;
		const groupName = config.hasOwnProperty('grouping') ? config.grouping.column : '';
		if(groupName.trim().length>0){
			plotData = d3.nest()
			  .key(function(d) { return d[primaryGroup]; })
			  .entries(data)
			  .map( (data)=>{
				return({
					key: data.key,
					values: d3.nest()
						.rollup( (v)=>{ 
							let valueCount = 0;
							const totalCount = d3.sum(v, (d)=>{ 
								return isNaN(d.values) ? 1 : d.values
							})
							const value = Math.round((valueCount/totalCount)*100);
							return value;
						})
						.entries(data.values)
				})
			})


		}
		else{
			reject("Grouping is missing from config.")
			throw "Grouping is missing from config."
		}

		resolve(plotData);
	})
	return promise;
}


export default getPlotDataByPercentage;