import {
	//processors collection
	NEW_PROCESSOR,
	REMOVE_PROCESSOR,
	ADD_PROCESSOR,
	//processor
	UPDATE_PROCESSOR,
	SET_FORM_FOR_PROCESSOR,
	UPDATE_PROCESSOR_VALUES,
	UPDATE_PROCESSOR_CONFIG_FIELDS, SET_PROCESSOR_TYPE
} from './actions';

import {processorFactory, processorTypesMap} from '../factories/processorFactory';

/**
 * Clone an object of various types
 *
 * Copied from: https://jsfiddle.net/pahund/5qtt2Len/1/
 *
 * @see: http://stackoverflow.com/questions/30626070/shallow-clone-an-es6-map-or-set
 * @param {Object|Map|Set|Date} obj
 * @returns {*}
 */
export function clone(obj) {
	let copy;

	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (obj instanceof Date) {
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}

	if (obj instanceof Map) {
		return new Map(clone(Array.from(obj)));
	}

	if (obj instanceof Array) {
		copy = [];
		for (let i = 0, len = obj.length; i < len; i++) {
			copy[i] = clone(obj[i]);
		}
		return copy;
	}

	if (obj instanceof Object) {
		copy = {};
		for (const attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				copy[attr] = clone(obj[attr]);
			}
		}
		return copy;
	}
	throw new Error('Unable to copy object! Its type isn\'t supported');
}

/**
 * Default processors collection state
 *
 * An empty map, processors state is a Map()
 * @type {Map<any, any>}
 */
export const CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE = new Map();


/**
 * Reducer for managing a collection of processors
 *
 * State is the processors collection, as a map.
 * ^^ Might be a mistake.
 *
 * @param {Map}state
 * @param {Object} action
 * @returns {Map<any, any>}
 */
export const processorsReducer = (state = CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE, action) => {
	switch( action.type ){
	case NEW_PROCESSOR:
	case ADD_PROCESSOR:
		switch( action.type ) {
		case NEW_PROCESSOR:
			const ID = 'p_' + Math.random().toString(36).substring(7);
			//@TODO replace with generateId util function
			state.set( ID, {
				ID,
				configFields: {}
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
		if( action.processor.type !== state.get( action.processor.ID ).type ){
			action.processor.configFields = {};
		}

		return state.set( action.processor.ID, processorFactory(
			action.processor.ID,
			action.processor.type,
			action.processor.configFields,
		));

	case  REMOVE_PROCESSOR:
		state.delete(action.processorId);
		return clone(state);
	default:
		return state;
	}

};


/**
 * Reducer for processor Types
 *
 *
 * @param state
 * @param action
 * @return {Map<any, any>}
 */
export const processorTypesReducer = (state = processorTypesMap, action) => {
	switch( action.type ){
	case SET_PROCESSOR_TYPE:
		return state.set(
			action.processorTypeIdentifier,
			action.processorType
		);
	default:
		return state;
	}

};




/**
 * Default processor state.
 *
 * Contains the form configuration (for mappings) that should NOT be mutated via this reducer
 * Contains the processor config as a Map()
 *
 * @type {{form: {}, processor: Map<any, any>}}
 */
export const CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE = {
	form: {},
	processor:  {},
	configFields: {},
	configValues: new Map()
	/* @TODO conditionals for processors */
};



/**
 * Reducer for managing one processor as it is being editted
 *
 * NOTE: NOT USED. Either each processor gets its own container and reducer (this one) or this get removed)
 *
 * Contains the form processor belongs to for field mapping/ magic selecting
 * Processor is a Map()
 *
 * @param {Object} state
 * @param {Object} action
 * @returns {{form: {}, processor: Map<any, any>}}
 */
export const processorReducer = (state = CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE, action ) =>{
	switch( action.type ){
	case UPDATE_PROCESSOR:
		return {
			...state,
			processor:action.processor
		};

	case UPDATE_PROCESSOR_CONFIG_FIELDS: {
		return {
			...state,
			configFields:action.configFields
		};
	}

	case SET_FORM_FOR_PROCESSOR:
		return {
			...state,
			form: action.form
		};
	case  UPDATE_PROCESSOR_VALUES:
		return {
			...state,
			configValues: action.configValues
		};
	default:
		return state;
	}
};