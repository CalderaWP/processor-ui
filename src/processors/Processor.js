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

	/**
	 * Checks if default config fields are available for class instance.
	 *
	 * Specifically checks if a static property defaultConfigFields of class instance default is an object.
	 * @returns {boolean}
	 */
	hasDefaultConfigFields(){
		return 'object' === typeof this.constructor.defaultConfigFields;
	}
}