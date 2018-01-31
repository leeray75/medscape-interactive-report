export default class TraceData{
	constructor(groupData,chartProps = {}){
		let x = [];
    	let y = [];

	    groupData.data.forEach( (d)=>{
	    	if(chartProps.orientation=='h'){
		    	y.push(d.name);
		    	x.push(d.value);
	    	}else{
		    	y.push(d.value);
		    	x.push(d.name);
	    	}

	    })
	    const _data = {
	    	x,
	    	y,
	    	name: groupData.name
	    }
	    chartProps = Object.assign({},chartProps);

	    let chartData = Object.assign(chartProps,_data);
	    const entries = Object.entries(chartData);
	    entries.forEach( (entry)=>{
	    	this[entry[0]]=entry[1];
	    })

	}
}