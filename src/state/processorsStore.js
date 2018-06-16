import { registerStore } from '@wordpress/data';

import {
	CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE,
	//processorsReducer,
	clone
} from './reducers';

import {
	ADD_PROCESSOR,
	addProcessor,
	NEW_PROCESSOR,
	newProcessor,
	REMOVE_PROCESSOR,
	removeProcessor,
	UPDATE_PROCESSOR,
} from './actions';

import {
	getProcessorsCollection,
	getProcessorFromCollection,
} from './selectors';


const config = {
	reducer(state = CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE,action){
		//copypasta of processorsReducer, should be using processorsReducer, but it is undefined in this closure.
		switch( action.type ){
		case NEW_PROCESSOR:
		case ADD_PROCESSOR:

			switch( action.type ) {
			case NEW_PROCESSOR:
				const ID = 'p_' + Math.random().toString(36).substring(7);
				//@TODO replace with generateId util function
				state.set( ID, {
					ID
				} );
				break;
			case ADD_PROCESSOR:
				state.set( action.processor.ID, action.processor);
				break;
			default:
				break;
			}
			return clone(state);
		case UPDATE_PROCESSOR:
			state.set( action.processor.ID, action.processor);
			return clone(state);
		case  REMOVE_PROCESSOR:
			state.delete(action.processorId);
			return clone(state);
		default:
			return state;
		}
	},
	actions: {
		addProcessor,
		newProcessor,
		removeProcessor
	},

	selectors: {
		getProcessorsCollection,
		getProcessorFromCollection
	},

	resolvers: {

	},
};
export const CALDERA_FORMS_PROCESSORS_STORE_SLUG = 'CALDERA_FORMS_PROCESSORS_STORE';
export const processorsStore = registerStore(
	CALDERA_FORMS_PROCESSORS_STORE_SLUG,
	config

);