import { registerStore, combineReducers } from '@wordpress/data';

import {
	processorsReducer,
	processorTypesReducer
} from './reducers';

import {
	addProcessor,
	newProcessor,
	removeProcessor,
	updateProcessor,
	setProcessorType
	,
} from './actions';

import {
	getProcessorsCollection,
	getProcessorFromCollection,
} from './selectors';


//Create the basic options for the store besides the reducer
let options = {
	actions: {
		addProcessor,
		newProcessor,
		removeProcessor,
		updateProcessor,
		setProcessorType
	},

	selectors: {
		getProcessorsCollection(state){
			return getProcessorsCollection( state.processorsReducer );
		},
		getProcessorFromCollection(state, processorId){
			return getProcessorFromCollection(state.processorsReducer,processorId);
		},
		getProcessorTypes(state){
			return state.processorTypesReducer;
		}
	},

	resolvers: {

	},
};

//combine the reducers
options.reducer = combineReducers({
	processorsReducer,
	processorTypesReducer
}
);

/**
 * The identifier for the processors store
 * @type {string}
 */
export const CALDERA_FORMS_PROCESSORS_STORE_SLUG = 'CALDERA_FORMS_PROCESSORS_STORE';

/**
 * The store for Caldera Forms Processors
 */
export const processorsStore = registerStore(
	CALDERA_FORMS_PROCESSORS_STORE_SLUG,
	options
);