import { registerStore } from '@wordpress/data';

import {
	processorsReducer,
} from './reducers';

import {
	addProcessor,
	newProcessor,
	removeProcessor,
	updateProcessor,
} from './actions';

import {
	getProcessorsCollection,
	getProcessorFromCollection,
} from './selectors';


const config = {
	actions: {
		addProcessor,
		newProcessor,
		removeProcessor,
		updateProcessor
	},

	selectors: {
		getProcessorsCollection,
		getProcessorFromCollection
	},

	resolvers: {

	},
};

config.reducer = processorsReducer;
export const CALDERA_FORMS_PROCESSORS_STORE_SLUG = 'CALDERA_FORMS_PROCESSORS_STORE';
export const processorsStore = registerStore(
	CALDERA_FORMS_PROCESSORS_STORE_SLUG,
	config

);