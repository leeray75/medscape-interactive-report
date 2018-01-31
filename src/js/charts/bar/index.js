/* charts/bar module */
import Plotly from 'npm/plotly.js/lib/core';
import Bar from 'npm/plotly.js/lib/bar';
import HorizontalBar from './horizontal';
import VerticalBar from './vertical'
Plotly.register([
	Bar
])
export { HorizontalBar };
export { VerticalBar };