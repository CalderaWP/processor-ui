import {SET_PROCESSOR_TYPE, setProcessorType} from './actions';
import {getProcessorType} from './selectors';
//import {processorTypesReducer} from "./reducers";
import { registerStore } from '@wordpress/data';
import {processorTypesMap} from '../factories/processorFactory';

export let processorTypesStoreConfig = {
	actions: {
		setProcessorType
	},
	selectors: {
		getProcessorType
	},
	reducer( state = processorTypesMap, action ) {
		//copypasta beacuse it works
		//import {processorTypesReducer} from "./reducers";
		switch( action.type ){
		case SET_PROCESSOR_TYPE:
			return state.set(
				action.processorTypeIdentifier,
				action.processorType
			);
		default:
			return state;
		}
	}
};


/**
 * Identifier for the processor types store
 * @type {string}
 */
export const CALDERA_FORMS_PROCESSOR_TYPES_STORE_SLUG = 'CALDERA_FORMS_PROCESSOR_TYPES_STORE';

/**
 * wp.data store for processor types
 */
export const processorTypesStore = registerStore(
	CALDERA_FORMS_PROCESSOR_TYPES_STORE_SLUG,
	processorTypesStoreConfig
);