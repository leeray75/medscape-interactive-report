
import { debounceTime } from 'rxjs/operators';
import './styles.scss';
export default class Tooltip{
	constructor(observable){
		//this.el = this.el || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el = document.createElement('div');
		this.el.classList.add('tooltip');

		document.body.appendChild(this.el);
		observable.pipe(debounceTime(200))
		.subscribe((data)=>{
			console.log('data',data);
			if(data==null) return;
			this.el.style['top']= data.pageY+'px';
			this.el.style['left']=data.pageX+'px';
			let _data = {
				message: '',
				data: []
			}
			_data = Object.assign(_data,data);
			this.render(_data);
		})
	}

	render(data){
		this.el.innerHTML = data.message;
		this.el.style.display= (data.message.length==0) ? "none" : "";
	}

}