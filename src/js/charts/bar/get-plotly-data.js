import TraceData from 'app/charts/trace-data';
const getPlotlyData = (data,chartProps)=>{
	const plotlyData = [];
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

export default getPlotlyData;