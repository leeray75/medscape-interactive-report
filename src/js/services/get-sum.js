import Plotly from 'npm/plotly.js/lib/core';
const d3 = Plotly.d3;

const getSum = function(config){
	const promise = new Promise( (resolve,reject)=>{
		let data = this.getFilteredData(config.filters);
		let plotData = d3.nest();
		const primaryGroup = config.primaryGroup;
		const groupName = config.hasOwnProperty('grouping') ? config.grouping.column : '';
		if(groupName.trim().length>0){
			if(config.grouping.hasOwnProperty('mappings')){
				data = this.getGroupMappingData(data,config.grouping);
			}

			plotData = plotData
			  .key(function(d) { return d[groupName]; })
			  .entries(data)
			  .map( (data)=>{
			  	let key = data.key;
				return({
					key: key,
					values: d3.nest()
						.key((d)=>{ return d[primaryGroup]; })
						.rollup( (v)=>{ 
							return d3.sum(v, (d)=>{ 
								let values = isNaN(d.values) ? 1 : d.values
								return values;
							})
						})
						.entries(data.values)
				})
			})


		}
		else{
			plotData = plotData
			.key((d)=>{ return d[primaryGroup]; })
			.rollup( (v)=>{ 
				return d3.sum(v, (d)=>{ return isNaN(d.values) ? 1 : d.values})
			})
			.entries(data);
		}
		resolve(plotData);
	})
	return promise;
}


export default getSum;