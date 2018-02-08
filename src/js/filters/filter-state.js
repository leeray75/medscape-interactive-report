import { BehaviorSubject }from 'rxjs/Rx';
class FilterState extends BehaviorSubject{
	constructor(filters=[]){
		super(filters)
		this.filters = filters;
	}

	update(filters=[]){
		this.filters = filters;
		this.next(this.filters);
	}

}

export default FilterState;