export default class TraceData{
	constructor(groupData,chartProps = {}){
		let x = [];
    	let y = [];

	    groupData.values.forEach( (d)=>{
	    	if(chartProps.orientation=='h'){
		    	y.push(d.key);
		    	x.push(d.values);
	    	}else{
		    	y.push(d.values);
		    	x.push(d.key);
	    	}

	    })
	    const _data = {
	    	x,
	    	y,
	    	name: groupData.key
	    }
	    chartProps = Object.assign({},chartProps);

	    let chartData = Object.assign(chartProps,_data);
	    const entries = Object.entries(chartData);
	    entries.forEach( (entry)=>{
	    	this[entry[0]]=entry[1];
	    })

	}
}