import {
	getConfigFieldValueOrDefault,
	getConfigFieldDefaultValue} from "./util";

/**
 * Factory for single processor configs
 *
 * @param {Object} configField Config fields for processor config field.
 * @param {Object} configFieldDefaults Optional. Config field defaults for processor config field.
 * @returns {{}}
 */
export const configFieldFactory = (configField, configFieldDefaults = {} ) => {
	configField.value = getConfigFieldValueOrDefault(configField);
	configField.default = getConfigFieldDefaultValue(configField);
	configFieldDefaults.default = getConfigFieldDefaultValue(configFieldDefaults);
	if( null === configField.value ){
		configField.value = configFieldDefaults.default;
	}
	return {
		...configFieldDefaults,
		...configField,
	}
};
