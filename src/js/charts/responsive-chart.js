import Plotly from 'npm/plotly.js/lib/core';
const d3 = Plotly.d3;
export default class ResponsiveChart{
	constructor(el=document.createElement('figure')){
		this.el = el;
		const WIDTH_IN_PERCENT_OF_PARENT = 100,
    		HEIGHT_IN_PERCENT_OF_PARENT = 80;

		const gd3 = d3.select(this.el)
    		.style({
        		width: WIDTH_IN_PERCENT_OF_PARENT + '%',
        		'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

        		height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
        		'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
    		});

		this.gd = gd3.node();
		this.initEventListeners();
	}
	initEventListeners(){
		window.addEventListener("resize",(e)=>{
			console.log("Resize");
			Plotly.Plots.resize(this.gd);
		})

		window.addEventListener("orientationchange", ()=>{
		    Plotly.Plots.resize(this.gd);
		});

	}

}