import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import CalderaProcessorsWithState from './CalderaProcessorsWithState';
import { Provider } from 'react-redux';
import {processorsStore} from './state/processorsStore';
ReactDOM.render(
	<Provider store={processorsStore}>
		<CalderaProcessorsWithState />
	</Provider>,
	document.getElementById('root')
);



