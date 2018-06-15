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
 * @param state
 * @returns {Map}
 */
export const getProcessor = (state ) => {
	return state.processor;
};


/**
 * Get the form from the single processor reducer processorReducer
 * @param state
 * @returns {Object}
 */
export const getFormForProcessor = ( state ) => {
	return state.form;
};

/**
 * Get the values from the single processor reducer processorReducer
 * @param state
 * @returns {Object}
 */
export const getProcessorValues  = (state) => {
	return state.configValues;
};

/**
 * Get the values from the single processor reducer processorReducer
 * @param {Object} state
 * @returns {Object}
 */
export const getProcessorValue  = (state,configFieldId) => {
	return state.configValues.has(configFieldId)
		? state.configValues.get(configFieldId)
		: null;
};