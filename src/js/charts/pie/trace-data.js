export default class TraceData{
	constructor(groupData,chartProps = {}){
		let values = [];
    	let labels = [];
    	this.name = groupData.key;
    	this.type="pie";
	    groupData.values.forEach( (d)=>{
	    	values.push(d.values);
	    	labels.push(d.key);
	    })
	    const _data = {
	    	values,
	    	labels
	    }
	    chartProps = Object.assign({},chartProps);

	    let chartData = Object.assign(chartProps,_data);
	    const entries = Object.entries(chartData);
	    entries.forEach( (entry)=>{
	    	this[entry[0]]=entry[1];
	    })

	}
}