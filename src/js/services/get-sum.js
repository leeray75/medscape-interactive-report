import Plotly from 'npm/plotly.js/lib/core';
const d3 = Plotly.d3;



const getSum = function(config){
	const promise = new Promise( (resolve,reject)=>{
		let data = this.getFilteredData(config.filters);
		let plotData = d3.nest();
		const primaryGroup = config.primaryGroup;
		const valueColumn = config.valueColumn;
		console.log("config:",config,"\ndata:",data);
		const groupName = config.hasOwnProperty('grouping') ? config.grouping.column : '';

		const calculateSum = function(d){
				const number = valueColumn!=null ? Number(d[valueColumn].replace(/[^0-9\.-]+/g,"")) : null;
				let sum = 1;
				if(number==null || isNaN(number)){
					sum = isNaN(d.sum) ? 1 : d.sum;
				}
				else{
					sum = number;
				}
				return sum
			
		}

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
							//console.log("rollup:",v);
							return d3.sum(v, calculateSum)
						})
						.entries(data.values)
				})
			})


		}
		else{
			plotData = plotData
			.key((d)=>{ return d[primaryGroup]; })
			.rollup( (v)=>{ 
				return d3.sum(v, calculateSum)
			})
			.entries(data);
		}
		resolve(plotData);
	})
	return promise;
}


export default getSum;