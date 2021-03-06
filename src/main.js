import React, {PureComponent} from 'react';
import ReactDOM, {render} from 'react-dom';
import data from './../data/data';
import D3Example from './D3Example';
import moment from 'moment';
import VictoryExample from './VictoryExample';

// Convert date strings to Date objects
let maxIndex = -1, machineIndex = 0, minXTotal, maxXTotal;
Object.keys(data.machines).forEach((id) => {
	data.machines[id].solution_vars.volume.values = data.machines[id].solution_vars.volume.values.map((d, i) => {
		const time = moment(d.time).toDate();
		if (!minXTotal) minXTotal = time;
		maxXTotal = time;
		if (i > maxIndex) {
			machineIndex = id;
			maxIndex = i;
		}
		return {...d, time};
	});
});

const STYLE_OUTER = {padding: 16};
const STYLE_NAV = {borderBottom: '1px solid black', paddingBottom: 8};
const STYLE_MAIN = {position: 'absolute', top: 48, left: 16, bottom: 0, right: 16};

export default class App extends PureComponent {
	static displayName = "App";

	state = {
		page: null
	}

	render () {
		const {page} = this.state;
		const chartProps = {data, machineIndex, maxIndex, maxXTotal, minXTotal};

		return (
			<div style={STYLE_OUTER}>
				<nav style={STYLE_NAV}>
					<button onClick={this._handleVictory}>Render with Victory</button>
					<button onClick={this._handleD3}>Render with d3</button>
				</nav>
				<div style={STYLE_MAIN}>
					{page === 'victory' ? <VictoryExample {...chartProps} /> : null}
					{page === 'd3' ? <D3Example {...chartProps} /> : null}
				</div>
			</div>
		);
	}

	_handleVictory = () => {
		this.setState({page: 'victory'});
	}

	_handleD3 = () => {
		this.setState({page: 'd3'});
	}
}

render(<App />, document.getElementById('App'));