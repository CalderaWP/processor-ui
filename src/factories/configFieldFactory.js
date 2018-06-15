/**
 * Factory for single processor configs
 *
 * @param {Object} configField Config fields for processor config field.
 * @param {Object} configFieldDefaults Optional. Config field defaults for processor config field.
 * @returns {{}}
 */
export const configFieldFactory = (configField, configFieldDefaults = {} ) => {
	return {
		...configFieldDefaults,
		...configField,
	}
};
