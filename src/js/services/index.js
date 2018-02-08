import getAll from './get-all';
import getSum from './get-sum';
import getPercentage from './get-percentage';
import getFilteredData from './get-filtered-data';
import getGroupMappingData from './get-group-mapping-data';
class Service {
	constructor(surveyId){
		this.surveyId = surveyId;
		this.data = [];
		this.getAll = getAll.bind(this);
		this.getSum = getSum.bind(this);
		this.getPercentage = getPercentage.bind(this);
		this.getFilteredData = getFilteredData.bind(this);
		this.getGroupMappingData = getGroupMappingData.bind(this);

	}

}
export default Service;