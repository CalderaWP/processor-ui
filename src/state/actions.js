import {CALDERA_FORMS_PROCESSORS_STORE_SLUG} from './state';

/**
 * The name of the action to add a processor to collection
 * @type {string}
 */
export const ADD_PROCESSOR = `${CALDERA_FORMS_PROCESSORS_STORE_SLUG}/ADD_PROCESSOR`;

/**
 * The name of the action to create a new, empty processor and add it to the collection
 * @type {string}
 */
export const NEW_PROCESSOR = `${CALDERA_FORMS_PROCESSORS_STORE_SLUG}/NEW_PROCESSOR`;

/**
 * The name of the action to remove a processor from the collection
 * @type {string}
 */
export const REMOVE_PROCESSOR = `${CALDERA_FORMS_PROCESSORS_STORE_SLUG}/REMOVE_PROCESSOR`;

/**
 * Creates an action to add a processor to the collection
 * @param {Object} processor Processor config
 * @returns {{type: string, processor: *}}
 */
export const addProcessor = (processor) => {
	return {
		type: ADD_PROCESSOR,
		processor
	};
};

/**
 * Creates an action to create a new, empty processor and add it to the collection
 * @returns {{type: string}}
 */
export const newProcessor = () => {
	return {
		type: NEW_PROCESSOR,
	};
};

/**
 * Creates an action to remove a processor from the collection
 * @param {String} processorId Id of processor to remove
 * @returns {{type: string, processorId: *}}
 */
export const removeProcessor = (processorId) => {
	return {
		type: REMOVE_PROCESSOR,
		processorId
	};
};