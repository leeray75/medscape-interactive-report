import { BehaviorSubject }from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
window.Rx = Rx;
class MapService{
	constructor(){
		this.hover = new BehaviorSubject();
		this.click = new BehaviorSubject();
	}
	update(){

	}
}
export default MapService;