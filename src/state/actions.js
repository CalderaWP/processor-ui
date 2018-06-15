import {CALDERA_FORMS_PROCESSORS_STORE_SLUG,CALDERA_FORMS_PROCESSOR_STORE_SLUG} from './state';

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
 * The name of the action to set the form in the single processor store
 *
 * @type {string}
 */
export const SET_FORM_FOR_PROCESSOR = `${CALDERA_FORMS_PROCESSOR_STORE_SLUG}/SET_FORM_FOR_PROCESSOR`;
/**
 * The name of the action to update the processor in the single processor store
 *
 * @type {string}
 */
export const UPDATE_PROCESSOR = `${CALDERA_FORMS_PROCESSOR_STORE_SLUG}/UDPDATE_PROCESSOR`;

/**
 * Creates an action to add a processor with config to the collection
 *
 * Use for copying processors or presets.
 * To add a new empty processor use newProcessor action creator.
 * @param {Map} processor Processor config
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

/**
 * Creates an action to set the form in the single processor store.
 * @param {Object} form
 * @returns {{type: string, form: *}}
 */
export const setFormForProcessor = (form) => {
	return {
		type: SET_FORM_FOR_PROCESSOR,
		form
	};
};

/**
 * Creates an action to update the processor of the single processor store.
 * @param {Map} processor Processor config
 * @returns {{type: string, processor: *}}
 */
export const updateProcessor = (processor ) => {
	return {
		type: UPDATE_PROCESSOR,
		processor
	};
};