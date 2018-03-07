import { BehaviorSubject }from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
window.Rx = Rx;
class MapService extends BehaviorSubject{
	constructor(){
		super();
	}
	update(){

	}
}
export default new MapService();