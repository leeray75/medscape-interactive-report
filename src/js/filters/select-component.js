export default class SelectComponent{
	constructor(props){
		this.props = props;
		this.el = document.createElement('select');
		this.el.classList.add('filter-select-component');
		this.createOptions(props.data);
		this.initEventListeners();
	}
	createOptions(data){
		for( let option of data){
			const optionComponent = new Option(option);
			this.el.appendChild(optionComponent.el);
		}
	}
	initEventListeners(){
		this.el.addEventListener('change',this.props.onChange)
	}
	render(){

	}
}

class Option{
	constructor(option){
		this.option = option;
		this.el = document.createElement('option');
		this.el.setAttribute('value',option);
		this.el.innerHTML=option;
	}
}