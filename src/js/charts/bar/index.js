/* charts/bar module */
import Plotly from 'npm/plotly.js/lib/core';
import Bar from 'npm/plotly.js/lib/bar';
import HorizontalBar from './horizontal';
import VerticalBar from './vertical'
Plotly.register([
	Bar
])
window.Plotly = Plotly;
export { HorizontalBar };
export { VerticalBar };