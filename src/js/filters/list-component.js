export default class ListComponent{
	constructor(props){
		this.props=props;
		this.el = document.createElement('ul');
		this.el.classList.add('list-component');
		this.children = [];
		this.filterValutes = [];
		
	}
	removeChildren(){
		console.log("Remove Children:",this.el);
		if(this.children.length>0){
			this.children.forEach((child)=>{
				//console.log("removing child:",child.el);
				this.el.removeChild(child.el);
			});
			this.children=[];
		}
		this.filterValues=[];
	}

	createChildren(_data=[],name="filter-list"){
		const data = _data.sort( (filter1,filter2)=>{
			if(typeof(filter1)==='boolean'){
				return filter1===true ? -1 : 1;
			}
			else if(typeof(filter1)==='string'){
				return filter1.localeCompare(filter2);
			}
			else{
				return filter1 - filter2;
			}
			
		})
		data.forEach( (filterValue)=>{
			const props = {
				value: filterValue,
				name: name,
				onChange: this.optionChange.bind(this)
			}
			const item = new ListItem(props);
			this.el.appendChild(item.el);
			this.children.push(item);
		})
	}
	optionChange(data,isSelected){
		console.log("isSelected:",isSelected);
		console.log('option change:',data);

		if(isSelected && !this.filterValues.includes(data.value)){
			this.filterValues.push(data.value);
		}
		else if(!isSelected){
			this.filterValues = this.filterValues.filter( (value)=>{
				return value!=data.value;
			})
		}

		if(typeof(data.value)==='boolean'){
			this.filterValues = this.filterValues.filter( (value)=>{
				return value==data.value;
			})
		}

		const filter = {
			name: data.key,
			values: this.filterValues
		}
		this.props.onFilterChange([filter]);
	}

	render(data=[],name){
		this.removeChildren();
		this.createChildren(data,name);
		return this.el;
	}
}

class ListItem{
	constructor(props){
		this.props = props;
		this.el = document.createElement('li');
		this.el.classList.add('list-item');

		const labelEl = document.createElement('label');
		const inputEl = document.createElement('input');
		const nameEl = document.createElement('span');
		const inputType = (typeof(props.value)=='boolean') ? 'radio' : 'checkbox';

		inputEl.setAttribute('type',inputType);
		inputEl.setAttribute('name',props.name);
		nameEl.innerHTML = props.value;
		labelEl.appendChild(inputEl);
		labelEl.appendChild(nameEl);
		inputEl.addEventListener('change',(e)=>{
			const isSelected = e.target.checked
			const data = {
				key: this.props.name,
				value: this.props.value
			}
			this.props.onChange(data,isSelected);
		})
		this.el.appendChild(labelEl);
	}

}