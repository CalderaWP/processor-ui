
/**
 * Get all of the processors in collection
 *
 * @param {Map} state Current state.
 */
export const getProcessorsCollection = (state) => {
	const isMap = state instanceof Map;
	return isMap
		? state
		: new Map(state);
};

/**
 * Get one processor from the processors collection reducer processorsReducer
 * @param {Map} state
 * @param {String} processorId
 */
export const getProcessorFromCollection = (state, processorId) => {
	if( state.has(processorId)){
		return state.get( processorId );
	}
	return null;
};

/**
 * Get the processor from the single processor reducer processorReducer
 * @param {Map} state Current state.
 * @returns {Map}
 */
export const getProcessor = (state ) => {
	return state.processor;
};


/**
 * Get the form from the single processor reducer processorReducer
 * @param {Map} state Current state.
 * @returns {Object}
 */
export const getFormForProcessor = ( state ) => {
	return state.form;
};

/**
 * Get the values from the single processor reducer processorReducer
 * @param {Map} state Current state.
 * @returns {Object}
 */
export const getProcessorValues  = (state) => {
	return state.configValues;
};

/**
 * Get the values from the single processor reducer processorReducer
 * @param {Map} state Current state.
 * @param {String} configFieldId ID to search for.
 * @returns {Object}
 */
export const getProcessorValue  = (state,configFieldId) => {
	return state.configValues.has(configFieldId)
		? state.configValues.get(configFieldId)
		: null;
};

/**
 * Get a processor type definition from the processorTypes map
 * @param {Map} state Current state.
 * @param {String} processorTypeIdentifier ID of processor type to search by
 * @returns {Object|null}
 */
export const getProcessorType = (state,processorTypeIdentifier) => {
	return state.has( processorTypeIdentifier )
		? state.get( processorTypeIdentifier )
		: null;
};

