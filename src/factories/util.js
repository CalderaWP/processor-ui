/**
 * Finds value property of config field or config field default
 * @param {Object} configField Config field to search for default in
 * @returns {String|Number|Array|null}
 */
export const getConfigFieldValue = (configField) => {
	return 'object'=== typeof configField && configField.hasOwnProperty('value')
		? configField.value
		: null;
};

/**
 * Finds default property of config field or config field default
 * @param {Object} configField Config field to search for default in
 * @returns {String|Number|Array|null}
 */
export const getConfigFieldDefaultValue = (configField) => {
	return 'object'=== typeof configField && configField.hasOwnProperty('default')
		? configField.default
		: null;
};

/**
 * Finds value of config field, falling back to default value
 * @param {Object} configField Config field to search for value or defualt in
 * @returns {String|Number|Array|null}
 */
export const getConfigFieldValueOrDefault = (configField ) => {
	return null !== getConfigFieldValue(configField)
		? getConfigFieldValue(configField)
		: null !== getConfigFieldDefaultValue(configField)
			? getConfigFieldDefaultValue(configField)
			: null;
};