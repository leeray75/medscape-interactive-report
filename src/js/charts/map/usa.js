import Plotly from 'npm/plotly.js/lib/core';
import * as topojson from 'npm/topojson';
import StatesData from './us-states';
import RegionsMapping from './us-regions-mapping';
import * as d3 from 'd3';
import Tooltip from 'app/tooltip';
import MapService from './service';
window.d3 = d3;
console.log("topojson", topojson);
console.log("d3:", d3);
export default class UsaMap {
	constructor(data, containerEl = document.body) {
		this.data = data;
		this.observableData = null;
		this.containerEl = containerEl;
		//this.el = this.el || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el = this.el || document.createElement('figure');
		this.el.classList.add('usa-map');
		this.mapService = new MapService();
		this.tooltip = new Tooltip(this.mapService.hover);
		this.regions = {};
		
		RegionsMapping.forEach((region) => {
			region.states.forEach((state) => {
				this.regions[state] = {
					name: region.name,
					color: region.color
				}
			})
		})
		StatesData.features.forEach(state => {
			state.properties.region = this.regions[state.properties.name];
		})
	}
	setObservableData(observableData){
		console.log("set observableData:",observableData);
		this.observableData = observableData;
	}
	drawChart(apidata = []) {
		//Width and height of map
		console.log("apidata:", apidata);
		var width = 960;
		var height = 500;
		let centered = null;

		// D3 Projection
		var projection = d3.geoAlbersUsa()
			.translate([width / 2, height / 2]) // translate to center of screen
			.scale([1070]); // scale things down so see entire US

		// Define path generator
		var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
			.projection(projection); // tell path generator to use albersUsa projection
		let statesLived = [];
		var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

		var g = svg.append("g");
		let _this = this;
		d3.csv("states-lived.csv", (data) => {
			//console.log("States Lived Data:\n", JSON.stringify(data));
			let _this = this;
			statesLived = data;

			g.append("g")
				.attr("id", "states")
				.selectAll("path")
				.data(StatesData.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("stroke", "#fff")
				.style("fill", (d) => {
					const state = statesLived.find((state) => {
						return d.properties.name == state.state && state.visited != "0";
					})
					d.style = {
						fill: state != null ? "#600" : "#006"
					}
					d.style.fill = d.properties.region ? d.properties.region.color : '#000';
					return d.style.fill;
				})
				.style("stroke-width", "1")
				.attr('class', (d) => {
					//console.log("classed:", d);
					const regionClassName = d.properties.region ? d.properties.region.name.replace(/\s+/g, '-').toLowerCase() : '';
					return `region ${regionClassName}`;
				})
				.on("mouseover", function(d, i, el) {
					//console.log("this:", this.style);
					//console.log("mouseover:", d);
					//console.log("i:", i);
					//console.log("el:", el);
					//d3.select(this).style("fill", "#666");
					let stateData = apidata.filter((_data)=>{
						return _data.state == d.properties.abbreviation;
					})
					//console.log("stateData",stateData);
					d3.selectAll('.' + d.properties.region.name.replace(/\s+/g, '-').toLowerCase()).style('fill', '#666');
					const data = {
						message: d.properties.region.name,
						data: stateData,
						pageX: d3.event.pageX,
						pageY: d3.event.pageY
					}
					_this.mapService.hover.next(data);
				})
				.on("mouseout", function(d) {
					const data = {
						message: "",
						pageX: d3.event.pageX,
						pageY: d3.event.pageY
					}
					//d3.select(this).style("fill", d.style.fill);
					d3.selectAll('.' + d.properties.region.name.replace(/\s+/g, '-').toLowerCase()).style('fill', d.style.fill);
					_this.mapService.hover.next(data);
				})
				.on("click", function(d) {
					console.log("PLACE:", d);
					const data = {
						message: d.place,
						pageX: d3.event.pageX,
						pageY: d3.event.pageY
					}

					//MapService.next(data); 
					let topData = topojson.topology({
						states: StatesData
					});
					console.log("topData:", topData);
					console.log("Features:", StatesData.features);
					console.log("StatesData:", StatesData);
					const filteredRegions = topData.objects.states.geometries.filter(function(d2) {
						let name = d2.properties.region ? d2.properties.region.name : "";
						return d.properties.region.name == name;
					})
					console.log("filteredRegions:", filteredRegions);
					var mergeTopo = topojson.merge(topData, filteredRegions);
					console.log("mergeTopo:", mergeTopo);
					var mergeCentroid = path.centroid(mergeTopo);
					console.log("mergeCentroid", mergeCentroid);
					var x, y, k;
					let dim = {};
					if (d && centered !== d) {
						var centroid = path.centroid(d);
						dim.x = mergeCentroid[0];
						dim.y = mergeCentroid[1];
						dim.k = 2;
						centered = d;
					} else {
						dim.x = width / 2;
						dim.y = height / 2;
						dim.k = 1;
						centered = null;
					}
					console.log("dim:", dim);
					const transform = `translate(${width / 2},${height / 2})scale(${dim.k})translate(-${dim.x},-${dim.y})`;
					console.log("transform:", transform);
					g.selectAll("path")
						.classed("active", centered && function(d) {
							return d === centered;
						});

					g.transition()
						.duration(750)
						.attr("transform", transform)
						.style("stroke-width", 1.5 / dim.k + "px");

						console.log("dim.k=",dim.k);

					if(dim.k==2){
						const filterData = [{
							name: "state",
							values: [d.properties.abbreviation]
						}]
						//_this.observableData.update(filterData);
						_this.mapService.click.next(d.properties)
					}
					else{
						const filterData = [{
							name: "state",
							values: []
						}]
						//_this.observableData.update(filterData);
						_this.mapService.click.next(null)
					}
				})
			/*
							d3.json("cities.json", function(data) {
								console.log("cities:\n",data);
							g.selectAll("circle")
								.data(data)
								.enter()
								.append("circle")
								.attr("cx", function(d) {
									return projection([d.lon, d.lat])[0];
								})
								.attr("cy", function(d) {
									return projection([d.lon, d.lat])[1];
								})
								.attr("r", function(d) {
									return Math.sqrt(d.years) * 4;
								})
									.style("fill", "rgba(0,255,0,.75)")
									.style("stroke","#fff")
									.style("opacity", 0.85)	

								// Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks" 
								// http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html


							    // fade out tooltip on mouse out            
							    
							    .on("mouseout", function(d) {       
									const data = {
										message: "",
										pageX: d3.event.pageX,
										pageY: d3.event.pageY
									}
									MapService.next(data);
							    });
							    
							});  
					*/
		});
		//Create SVG element and append map to the SVG


	}

}