import {configFieldFactory} from "./configFieldFactory";

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

	function setConfigInMap(configFieldId, value) {
		let configField = {
			...configFields[configFieldId],
			ID: configFieldId,
			value: value
		};

		if( configFieldsDefaults.hasOwnProperty(configFieldId)) {
			configField = configFieldFactory(configField,configFieldsDefaults[configFieldId]);
		}
		configFieldsMap.set(configFieldId, configField);
	}

	function getConfigFieldValue(configFieldId){
		return configValues.has( configFieldId )
			? configValues.get( configFieldId )
			: null;
	}



	Object.keys(configFields).map(configFieldId => {
		const value = null !== getConfigFieldValue(configFieldId)
			? getConfigFieldValue(configFieldId)
			: configFields[configFieldId].hasOwnProperty( 'default' )
				? configFields[configFieldId].default
				: '';
		setConfigInMap(configFieldId, value);
	});

	Object.keys( configFieldsDefaults ).map( configFieldDefaultId => {
		if( ! configFields.hasOwnProperty(configFieldDefaultId )){
			configFieldsMap.set(configFieldDefaultId, configFieldsDefaults[configFieldDefaultId]);
		}
	});

	//It would probably be good to freeze this Map or use immutable.js Map.
	return configFieldsMap;
};
