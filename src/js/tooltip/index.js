
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
			this.render(data.message);
		})
	}

	render(msg=""){
		this.el.innerHTML = msg;
		this.el.style.display= (msg.length==0) ? "none" : "";
	}

}