const getGroupMappingData = function(data=this.data,grouping={}){
	const groupName = grouping.column;
	const mappings = grouping.mappings;
	data = data.map( (entry)=>{
		const mapping = mappings.find( (mapping)=>{
			let value = entry[groupName];
			let test = eval(`(function(value){ ${mapping.formula} })(value)`) ;
			return test;
		})

		if(mapping!=null){
			entry[groupName]= mapping.key;
		}
		return entry;
	})
	return data;
}
export default getGroupMappingData ;