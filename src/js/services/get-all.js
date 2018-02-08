const getAll = function(surveyId){
		return fetch("https://my.api.mockaroo.com/specialties.json?key=ccdaa380").then(
			(response)=>{
			  return response.json();

			},
			(error)=>{
			  console.error("Error:",error)
			  throw error;
			}
		).then( (data)=>{
			this.data = data;
			return data;
		})
}
export default getAll;