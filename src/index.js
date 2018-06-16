import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppWithState from './AppWithState';
import { Provider } from 'react-redux';
import {processorsStore} from './state/processorsStore';


ReactDOM.render(
	<Provider store={processorsStore}>
		<AppWithState />
	</Provider>,
	document.getElementById('root')
);

