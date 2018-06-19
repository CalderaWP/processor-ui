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
			if( 'object' === typeof  value ){
				map.set( key, {
					...value,
					ID: key,
					id: key
				});
			}

		});
	return theMap;

};




