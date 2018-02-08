export default class TraceData{
	constructor(groupData,chartProps = {}){
		this.x = [];
    	this.y = [];
    	this.marker = {};
    	this.name = groupData.key;
    	this.type = 'bar';
    	const values = groupData.values.sort((value1,value2)=>{
    		return value1.key.localeCompare(value2.key);
    	})
	    values.forEach( (d)=>{
	    	if(chartProps.orientation=='h'){
		    	this.y.push(d.key);
		    	this.x.push(d.values);
	    	}else{
		    	this.y.push(d.values);
		    	this.x.push(d.key);
	    	}

	    })

	    let chartData = Object.assign({},chartProps);

	    let entries = Object.entries(chartData);

	    entries.forEach( (entry)=>{
	    	this[entry[0]]=entry[1];
	    })

	}
}
