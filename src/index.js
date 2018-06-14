import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppWithState from './AppWithState';
import { Provider } from 'react-redux';
import {store} from './state/store';


ReactDOM.render(
	<Provider store={store}>
		<AppWithState />
	</Provider>,
	document.getElementById('root')
);

