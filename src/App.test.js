import React from 'react';
import ReactDOM from 'react-dom';
import {AppWrapped} from './App';
import App from './App';
import AppWithState from './AppWithState';
import { Provider } from 'react-redux';
import {store} from './state/store';

describe( 'App component', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App/>, div);
	});
	it.only('renders with state without crashing', () => {
		ReactDOM.render(
			<Provider store={store}>
				<AppWithState />
			</Provider>,
			document.createElement('section')
		);
	});
});

