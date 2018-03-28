import {HorizontalBar, VerticalBar} from './charts/bar';
import { BasicPie, SubplotsPie } from './charts/pie';
import UsaMap from './charts/map/usa';
import Service from './services';
import Filters from './filters';
import 'styles/global.scss';

const configs = [
	{
		primaryGroup: "specialty"
	},
	{
		title: "Happy Specialists By Gender",
		primaryGroup: "specialty",
		grouping:
		{
			column: "gender"
		},
		/*
		filters: [
			{
				name: "isHappy",
				values: [true]
			}
		],
		*/
		colors:[
			{
				grouping: 'Male',
				value: '#006'
			},
			{
				grouping: 'Female',
				value: 'green'
			},
			{
				primaryGroup: 'Critical Care',
				grouping: 'Male',
				value: '#009'

			},
			{
				primaryGroup: 'Critical Care',
				grouping: 'Female',
				value: '#900'
			}

		]		
	},
	{
		title: "Specialists Salaries Grouping",
		primaryGroup: "specialty",
		grouping: {
			column: 'salary',
			mappings:[
				{
					key: 'Less than $150,000',
					formula: 'value = Number(value.replace(/[^0-9\.-]+/g,"")); return value<150000'
				},
				{
					key: 'Between $150,000 && $250,000',
					formula: 'value = Number(value.replace(/[^0-9\.-]+/g,""));  return value>150000 && value<=250000'
				},
				{
					key: 'More than $250,000',
					formula: 'value = Number(value.replace(/[^0-9\.-]+/g,"")); return value>250000'
				}
			]
		},
		filters: [],
		colors:[
			{
				grouping: 'Less than $150,000',
				value: 'red'
			},
			{
				grouping: 'Between $150,000 && $250,000',
				value: 'green'
			},
			{
				grouping: 'More than $250,000',
				value: '#009'
			}

		],
		layout:{
	    	yaxis:{
	    		tickformat: '$,'
	    	}
		}
	},
	{
		title: "Specialists Salaries Grouping",
		primaryGroup: "gender",
		//valueColumn: "salary",
		filters: [
			{
				name: "specialty",
				values: ["Cardiology"]
			}
		],
		colors:[
			{
				primaryGroup: 'Male',
				value: '#009'

			},
			{
				primaryGroup: 'Female',
				value: '#900'
			}
		]

	},
	{
		primaryGroup: "isHappy"
	}

]

const service = new Service();
const config = configs[1];
const Chart = VerticalBar;
let isRendered = false;

service.getAll().then((data)=>{
	console.log("Data:",data);
	window.data = data;
	const verticalEl = document.getElementById('vertical-chart');
	let vChart = null;
 	let filterProps = {
 		data: data
 	}
 	const filter = new Filters(filterProps);
 	const filterState = filter.getState();
 	document.getElementById('filters').appendChild(filter.el);
 	filter.render();
 	filterState.update(config.filters);
 	let subscription = filterState.debounceTime(100).subscribe( (newFilters)=>{
 		console.log("Config:",config);
 		console.log("Updating config filters", newFilters);


 		config.filters = newFilters.filter( (filter)=>{
 			return filter.values.length>0;
 		});

 		service.getSum(config).then( (plotData)=>{
	 		console.log("plotData:",plotData);
	 		if(!isRendered){
		 		if(vChart!=null){
		 			verticalEl.removeChild(vChart.el);
		 		}
	 			console.log("create new chart");
			 	vChart = new Chart(plotData,verticalEl,config.layout);
			 	vChart.setColors(config.colors);
			 	vChart.render();
			 	//isRendered = true;
		 	}
		 	else{
		 		vChart.update(plotData);
		 	}
 		});
 	})

 	const usaMap = new UsaMap();
 	usaMap.setObservableData(filterState);
	usaMap.drawChart(data);

	usaMap.mapService.click.subscribe((state=null)=>{
		console.log("State:",state);
		let filters = [];
		if(state!=null){
			filters = [...filterState.filters,
			{
				name: "state",
				values:[state.abbreviation]
			}];
		}
		else if(config.hasOwnProperty('filters')){
			filters = config.filters.filter( (filter)=>{
				return filter.name!="state";
			})
		}
		console.log("filters:",filters);
		filterState.update(filters);
	})

    //mainEl.append(chart.render())
})

