/**
 * Base class for processors
 *
 * Should be an interface or type
 */
export class Processor {

	/**
	 * Create new processor
	 * @param {Object} configFields
	 * @param {Object} configValues
	 */
	constructor(configFields = {}, configValues = {} ){
		this.configFields = configFields;
		this.configValues = configValues;
	}

	/**
	 * Get the config fields
	 *
	 * @returns {Object}
	 */
	getConfigFields(){
		return this.configFields;
	}

	/**
	 * (re)Set the config fields
	 *
	 * @param {Object} configFields
	 */
	setConfigFields(configFields){
		this.configFields = configFields;
	}

	/**
	 * Get the config values
	 *
	 * @returns {Object}
	 */
	getConfigValues(){
		return this.configValues;
	}

	/**
	 * (re)Set the config values
	 *
	 * @param {Object} configValues
	 */
	setConfigValues(configValues){
		this.configValues = configValues;
	}
}