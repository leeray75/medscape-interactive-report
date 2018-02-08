import Select from './select-component';
import FilterList from './list-component';
import FilterState from './filter-state';
import './scss/filters.scss';
export default class Filter{
	constructor(props){
		this.props = props;
		this.el = document.createElement('section');
		this.el.classList.add('filter-component');
		this.data = props.data;
		this.config = props.config;
		this.filters = new Map();
		this.state = new FilterState();
		this.initFilters(data);
		console.log("filters:",this.filters);

	}
	getState(){
		return this.state;
	}
	initFilters(data){
		const keys = Object.keys(data[0]);
		keys.forEach( (key)=>{
			if(key!='id'){
				//this.filters[key]=[];
				this.filters.set(key,[]);
			}
		})
		const filterKeys = Array.from(this.filters.keys());
		data.forEach( (item)=>{
			filterKeys.forEach( (key)=>{
				const data = item[key];
				if(!this.filters.get(key).includes(data)){
					this.filters.get(key).push(data);
				}
			})
		})
		this.state.subscribe( (newFilters)=>{
			console.log("new filters:",newFilters);
		})

	}
	changeFilter(e){
		console.log("change filter:",e.target.value);
		this.filterList.render(this.filters.get(e.target.value),e.target.value);
	}
	changeFilterList(filters=[]){
		console.log("change Filter List",filters);
		this.state.update(filters);
	}
	render(){
		const filterKeys = this.filters.keys();
		console.log("filterKeys:",filterKeys);
		let props = {
			data: filterKeys,
			onChange: this.changeFilter.bind(this)
		}
		let select = new Select(props);

		this.el.appendChild(select.el);
		const listProps = {
			onFilterChange: this.changeFilterList.bind(this)
		}
		this.filterList = new FilterList(listProps);
		this.el.appendChild(this.filterList.el);
		console.log("Filter:",this.el);
	}
}