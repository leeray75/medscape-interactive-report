/* charts/bar module */
import Plotly from 'npm/plotly.js/lib/core';
import Pie from 'npm/plotly.js/lib/Pie';
import BasicPie from './basic';

Plotly.register([
	Pie
])
export { BasicPie };
