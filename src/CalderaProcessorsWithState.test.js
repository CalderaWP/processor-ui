import React from 'react';
import ReactDOM from 'react-dom';
import CalderaProcessors from './CalderaProcessors';
import CalderaProcessorsWithState from './CalderaProcessorsWithState';
import { Provider } from 'react-redux';
import {processorsStore} from './state/processorsStore';

describe( 'CalderaProcessors componentWithState', () => {
	it('renders without crashing', () => {
		function handler(){}

		const div = document.createElement('div');
		ReactDOM.render(<CalderaProcessors
			processors={new Map()}
			form={{ID: 'cf1', name: 'a', fields: {}}}
			onAddProcessor={handler}
			onRemoveProcessor={handler}
			onNewProcessor={handler}
			onUpdateProcessor={handler}
			processorTypes={new Map()}
			onUpdateProcessorType={() => {}}
			getProcessorFromCollection={() => {}}
			getProcessorTypes={() => {}}
		/>, div);
	});


	it('renders with state without crashing', () => {
		ReactDOM.render(
			<Provider store={processorsStore}>
				<CalderaProcessorsWithState />
			</Provider>,
			document.createElement('section')
		);
	});

});

