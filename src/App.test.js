import React from 'react';
import ReactDOM from 'react-dom';
import {AppWrapped} from './App';
import App from './App';
import AppWithState from './AppWithState';
import { Provider } from 'react-redux';
import {processorsStore} from './state/processorsStore';

describe( 'App component', () => {
	it('renders without crashing', () => {
		function handler(){}

		const div = document.createElement('div');
		ReactDOM.render(<App
			processors={new Map()}
			form={{ID: 'cf1', name: 'a', fields: {}}}
			onAddProcessor={handler}
			onRemoveProcessor={handler}
			onNewProcessor={handler}
			onUpdateProcessor={handler}

		/>, div);
	});
	it('renders with state without crashing', () => {
		ReactDOM.render(
			<Provider store={processorsStore}>
				<AppWithState />
			</Provider>,
			document.createElement('section')
		);
	});
});

