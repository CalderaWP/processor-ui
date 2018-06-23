/**
 * Finds value property of config field or config field default
 * @param {Object} configField Config field to search for default in
 * @returns {String|Number|Array|null}
 */
export const getConfigFieldValue = (configField) => {
	return 'object' === typeof configField && configField.hasOwnProperty('value')
		? configField.value
		: null;
};

/**
 * Finds default property of config field or config field default
 * @param {Object} configField Config field to search for default in
 * @returns {String|Number|Array|null}
 */
export const getConfigFieldDefaultValue = (configField) => {
	return 'object' === typeof configField && configField.hasOwnProperty('default')
		? configField.default
		: null;
};

/**
 * Finds value of config field, falling back to default value
 * @param {Object} configField Config field to search for value or defualt in
 * @returns {String|Number|Array|null}
 */
export const getConfigFieldValueOrDefault = (configField) => {
	return null !== getConfigFieldValue(configField)
		? getConfigFieldValue(configField)
		: null !== getConfigFieldDefaultValue(configField)
			? getConfigFieldDefaultValue(configField)
			: null;
};

/**
 * Convert an object (should have meaningful indexes) to a map
 * @param {Object} object Object to convert
 * @return {Map<any, any>}
 */
export const objectToMap = (object) => {
	const map = new Map();
	Object.keys(object).forEach(key => {
		map.set(key, object[key]);
	});
	return map;
};

/**
 * Add an ID prop, to all objects of a Map, using map's key.
 * @param {Map} theMap The map to add key as ID property to values of
 */
export const mapKeysToIdProperty = (theMap) => {
	theMap
		.forEach((value, key, map) => {
			if ('object' === typeof  value) {
				map.set(key, {
					...value,
					ID: key,
					id: key
				});
			}

		});
	return theMap;

};


/**
 * Check configField conditionals.
 *
 * Returns false if any conditionals fail.
 * Returns true if no conditionals fail, or there are no conditionals.
 *
 * @param {Object} configField The field to check the conditionals of.
 * @param {Object} fieldValues Optional. Data to pass to conditional rule callbacks
 * @return {boolean}
 */
export const checkConfigFieldConditionals = (configField, fieldValues = {}) => {
	if (!configField.hasOwnProperty('conditionals') || !Array.isArray(configField.conditionals)) {
		return true;
	}

	let allRulesPassed = true;
	configField.conditionals.forEach(conditional => {
		if ('function' === typeof conditional && false === conditional.call(null, fieldValues)) {
			allRulesPassed = false;
			return false;
		}
	});

	return allRulesPassed;

};

/**
 * Get the current values for configFields
 *
 * @param configFields
 */
export const reduceConfigFieldsToValues = (configFields) => {
	let values = {};
	 configFields.forEach(field => {
	 		values[field.ID] = field.value
			? field.value
			: field.default
				? field.default
				: null;
	 });
	 return values;
};