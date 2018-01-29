export default class ResponsiveChart{
	constructor(containerEl){
		this.state = {
			width: containerEl.offsetWidth,
			height: containerEl.offsetWidth*.5
		}
		this._state = Object.assign({},this.state);
		this.containerEl = containerEl;
		this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el.setAttribute('width',this.state.width);
		this.el.setAttribute('height',this.state.height);
		this.initEventListeners();
	}
	initEventListeners(){
		window.addEventListener("resize",(e)=>{
			this.updateState();
		})

		window.addEventListener("orientationchange", ()=>{
		    this.updateState();
		});

	}
	updateState(){
		let newWidth = this.containerEl.offsetWidth;
		let newHeight = this.containerEl.offsetWidth*.8;
		if(newWidth!= this._state.width){
			newHeight = (newWidth/this._state.width)*this._state.height;
		}
		this.state = Object.assign({},this.state);
		this.state.width = newWidth;
		this.state.height = newHeight;
		this.el.setAttribute('width',this.state.width);
		this.el.setAttribute('height',this.state.height);
	}
	update(){

	}

}