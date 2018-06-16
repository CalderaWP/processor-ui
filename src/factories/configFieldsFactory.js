import {configFieldFactory} from "./configFieldFactory";
import {
	getConfigFieldValueOrDefault,
	getConfigFieldDefaultValue
} from "./util";

/**
 * Prepare a collection of config fields
 *
 * Optionally merges with default config fields
 * Optionally sets values from a Map of config values
 *
 * @param {Object} configFields Config fields for processor. Indexed by config ID.
 * @param {Object} configFieldsDefaults Optional. Config field defaults for processor. Indexed by config ID.
 * @param {Map} configValues Optional. A Map of config Values. Indexed by config ID.
 * @returns {Map}
 */
export const configFieldsFactory = (configFields, configFieldsDefaults = {},configValues = new Map()  ) => {
	const configFieldsMap = new Map(  );
	const clonedConfigFieldsDefaults = Object.assign({},configFieldsDefaults);

	/**
	 * Check if a configField's has a corresponding default config
	 *
	 * @param {String} configFieldId Id of config field to search for
	 * @returns {boolean}
	 */
	function hasConfigFieldDefault(configFieldId) {
		return clonedConfigFieldsDefaults.hasOwnProperty(configFieldId);
	}

	function getDefaultConfigObject(configFieldId) {
		return clonedConfigFieldsDefaults[configFieldId];
	}


	/**
	 * Set a config field into the Map that will be returned
	 *
	 * @param {String} configFieldId Config field ID
	 * @param {String|Number|Array} value Config field value
	 */
	function setConfigInMap(configFieldId, value) {
		let configField = {
			...configFields[configFieldId],
			ID: configFieldId,
			value: value
		};


		if( hasConfigFieldDefault(configFieldId)) {
			configField = configFieldFactory(configField,getDefaultConfigObject(configFieldId));
		}

		configFieldsMap.set(configFieldId, configField);
	}

	/**
	 * Get the value from the config field if possible
	 * @param {String} configFieldId Config field ID to search fo
	 * @returns {String|Number|Array|null} Returns null if not found
	 */
	function getFieldValue(configFieldId){
		return configValues.has( configFieldId )
			? configValues.get( configFieldId )
			: null;
	}

	//Priority for setting value:
	// fieldValues[configFieldId]
	// configField.value
	// configField.default
	// defaultConfigField.default

	//Collect config fields, adding values as needed
	Object.keys(configFields).map(configFieldId => {
		const value =  null !== getFieldValue(configFieldId)
			? getFieldValue(configFieldId)
			: null !== getConfigFieldValueOrDefault(configFields[configFieldId])
				? getConfigFieldValueOrDefault(configFields[configFieldId])
				: null
		//NewProcessor to map
		setConfigInMap(configFieldId, value);
	});

	//NewProcessor in any missing fields.
	Object.keys( clonedConfigFieldsDefaults ).map( configFieldDefaultId => {
		if( ! configFields.hasOwnProperty(configFieldDefaultId )){
			configFieldsMap.set(configFieldDefaultId, clonedConfigFieldsDefaults[configFieldDefaultId]);
		}
	});

	return configFieldsMap;
};
