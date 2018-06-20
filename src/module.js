/*eslint no-undef: "error"*/
/*eslint-env node*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import CalderaProcessors from './CalderaProcessors';
import CalderaProcessorsWithState from './CalderaProcessorsWithState';
import { Provider } from 'react-redux';
import {processorsStore} from './state/processorsStore';


export default  {
	CalderaProcessors,
	CalderaProcessorsWithState,
	processorsStore,
	factory: function(element, store = processorsStore )  {
		return ReactDOM.render(
			<Provider store={store}>
				<CalderaProcessorsWithState />
			</Provider>,
			element
		);

	}
}
