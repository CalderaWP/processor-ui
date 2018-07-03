/**
 * Prefix for all actions of the Caldera Forms processors store
 * @type {string}
 */
const CALDERA_FORMS_PROCESSORS_STORE_SLUG = 'CALDERA_FORMS_PROCESSORS_STORE';

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
 * The name of the action to set the form in the processor collection
 *
 * @type {string}
 */
export const SET_FORM_FOR_PROCESSOR = `${CALDERA_FORMS_PROCESSORS_STORE_SLUG}/SET_FORM_FOR_PROCESSOR`;
/**
 * The name of the action to update the processor in collection.
 *
 * @type {string}
 */
export const UPDATE_PROCESSOR = `${CALDERA_FORMS_PROCESSORS_STORE_SLUG}/UPDATE_PROCESSOR`;

/**
 * The name of the action to validate a a processor in collection.
 *
 * @type {string}
 */
export const VALIDATE_PROCESSOR = `${CALDERA_FORMS_PROCESSORS_STORE_SLUG}/VALIDATE_PROCESSOR`;
/**
 * The name of the action to update the processor values in the single processor store
 *
 * @type {string}
 */
export const UPDATE_PROCESSOR_VALUES = `${CALDERA_FORMS_PROCESSORS_STORE_SLUG}/UPDATE_PROCESSOR_VALUES`;

/**
 * The name of the action to update the processor values in the single processor store
 *
 * @type {string}
 */
export const UPDATE_PROCESSOR_CONFIG_FIELDS = `${CALDERA_FORMS_PROCESSORS_STORE_SLUG}/UPDATE_PROCESSOR_CONFIG_FIELDS`;

/**
 * The name of the action to set a processorType definition for a processor type in the processorType reducer
 *
 * @type {string}
 */
export const SET_PROCESSOR_TYPE = `${CALDERA_FORMS_PROCESSORS_STORE_SLUG}/SET_PROCESSOR_TYPE`;

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
 * Creates an action to update the processor in collection.
 * @param {Map} processor Processor config
 * @returns {{type: string, processor: *}}
 */
export const updateProcessor = (processor ) => {
	return {
		type: UPDATE_PROCESSOR,
		processor
	};
};

/**
 * Creates an action to update the processor values of the single processor store.
 * @param {Map} configValues New config values
 * @returns {{type: string, configValues: *}}
 */
export const updateProcessorValues = (configValues ) => {
	return {
		type: UPDATE_PROCESSOR_VALUES,
		configValues
	};
};

/**
 * Create an action to indicate that a processor should be validated
 *
 * @param {String} processorId Id of processor to be validated
 *
 * @return {{type: string, processorId: *}}
 */
export const validateProcessor = (processorId) => {
	return {
		type: VALIDATE_PROCESSOR,
		processorId
	}
};

/**
 * Creates an action to update the processor prepareConfigFields single processor store.
 * @param {Map} configFields New config fields
 * @return {{type: string, prepareConfigFields: *}}
 */
export const updateProcessorConfigFields = (configFields ) => {
	return {
		type: UPDATE_PROCESSOR_CONFIG_FIELDS,
		configFields
	};
};

/**
 * Set or remove a processorType in processorType reducer
 * @param {Object} processorType The processor type definition
 * @param {String} processorTypeIdentifier Unique identifier for processor type
 *
 * @return {{type: string, processorType: *, processorTypeIdentifier: *}}
 */
export const setProcessorType = (processorType, processorTypeIdentifier ) => {
	return{
		type: SET_PROCESSOR_TYPE,
		processorType,
		processorTypeIdentifier
	};
};