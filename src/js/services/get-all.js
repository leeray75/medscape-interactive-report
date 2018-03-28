const getAll = function(surveyId){
	//const url = "https://my.api.mockaroo.com/specialties.json?key=ccdaa380";
	const url = "/qnaservice/pub/survey/1/sum";
	const data = {
		columns: ["specialty","state","gender"],
		groupBy: ["specialty","state","gender"],
		filters:{
			"specialty": "Cardiology",
			"state": "NY"
		}
	}
	const config = {
	    body: JSON.stringify(data), // must match 'Content-Type' header
	    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	    credentials: 'same-origin', // include, same-origin, *omit
	    headers: {
	      'content-type': 'application/json'
	    },
	    method: 'POST', // *GET, POST, PUT, DELETE, etc.
	    mode: 'cors', // no-cors, cors, *same-origin
	    redirect: 'follow', // *manual, follow, error
	    referrer: 'no-referrer', // *client, no-referrer
	}
		return fetch(url,config).then(
			(response)=>{
			  let json = response.json();

			  return json;

			},
			(error)=>{
			  console.error("Error:",error)
			  throw error;
			}
		).then( (data)=>{
			console.log("data:",data);
			let responses = data.values
			this.data = data.values;
		/*
			responses.forEach( (item)=>{

				let _response = item.values;
				
				item.values.forEach( (response)=>{
					_response[response.key] = response.value;
				})
				
				this.data.push(_response);
			})
		*/
			console.log("data 2:",this.data);
			return this.data;
		})
}
export default getAll;