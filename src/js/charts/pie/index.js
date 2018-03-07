/* charts/bar module */
import Plotly from 'npm/plotly.js/lib/core';
import Pie from 'npm/plotly.js/lib/Pie';
import BasicPie from './basic';
import SubplotsPie from './subplots';

Plotly.register([
	Pie
])
export { BasicPie };
export { SubplotsPie }
