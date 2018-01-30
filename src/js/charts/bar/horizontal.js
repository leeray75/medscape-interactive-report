import d3 from 'app/charts/d3-commons'
import ResponsiveChart from 'app/charts/responsive-chart'
import './scss/horizontal.scss';
window.d3 = d3;
export default class HorizontalBar extends ResponsiveChart{
	constructor(containerEl,data){
		super(containerEl);
		this.data = data;
		this.el = this.el || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el.classList.add('horizontal-bar');
		this.init();
	}
	init(){
		const config = { attributes: true };
		const callback = (mutationsList)=>{
			mutationsList.forEach( (mutation)=>{
				if(mutation.type=='attributes'){
					this.drawChart();
				}
			});
		}
		const observer = new MutationObserver(callback);
		observer.observe(this.el,config);
	}
	update(){
		this.drawChart();
	}
	drawChart(){
		this.el.innerHTML='';
		let data = this.data;
		let svg = d3.select(this.el),
		    margin = {top: 20, right: 20, bottom: 30, left: 150},
		    width = parseInt(this.state.width) - margin.left - margin.right,
		    height = parseInt(this.state.height) - margin.top - margin.bottom;
		  
		  
		const x = d3.scaleLinear().range([0, width]);
		const y = d3.scaleBand().range([height, 0]);

		const g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		  
		  
		  	data.sort(function(a, b) { return a.value - b.value; });
		  	//const xLabels = d3.max(data, function(d) { return d.value; })
		  	const xMax = data[data.length-1].value;
		  	const yLabels = data.map((d) => { return d.name; });
		  	x.domain([0, xMax]);
		    y.domain(yLabels).padding(0.1);

		    g.append("g")
		        .attr("class", "x axis")
		       	.attr("transform", "translate(0," + height + ")")
		      	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { 
		      		return parseInt(d)+'%'; }
		      	).tickSizeInner([-height]));

		    g.append("g")
		        .attr("class", "y axis")
		        .call(d3.axisLeft(y));


		    g.selectAll(".bar")
		        .data(data)
		      .enter().append("rect")
		        .attr("class", (d)=>{
		        	let names = d.name.split("-");
		        	let name = names[0].trim().toLowerCase();
		        	name = name.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '-')
		        	return `bar data-${name}`
		        })
		        .attr("x", 0)
		        //.attr("height", y.bandwidth())
		        .style('height',(d)=>{
		        	let percentage = y.bandwidth()/parseInt(svg.attr('height'))*100;
		        	return `${percentage}%`;
		        })
		        .attr("y", function(d) { return y(d.name); })
		        .style('width',function(d){
		        	let percentage = x(d.value)/parseInt(svg.attr('width'))*100;
		        	return `${percentage}%`;
		        })
		        //.attr("width", function(d) { return x(d.value); })
		        const ticks = g.selectAll('.y.axis .tick');
		        ticks.attr("class",(d,i)=>{
		        	const data = this.data[i];
		        	let names = data.name.split("-");
		        	let name = names[0].trim().toLowerCase();
		        	name = name.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '-')
		        	return `tick data-${name}`
		        })
	}

	render(){
		this.drawChart(this.el);
		return this.el;
	}
}