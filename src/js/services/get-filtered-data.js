const getFilteredData = function(filters=[]){
	console.log("getFilteredData:",filters);
	let data = this.data;
	if(filters.length>0){
		console.log("Filtering");
		data = data.filter((data)=>{
			let isValid = true;
			filters.forEach( (filter)=>{
				isValid = isValid && filter.values.includes(data[filter.name]);
			});
			return isValid;
		})
	}
	return data;
}
export default getFilteredData;