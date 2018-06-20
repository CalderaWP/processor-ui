import {configFieldsFactory} from './configFieldsFactory';
import {processorTypes} from '../processors/processorTypes';

export const processorTypesMap = new Map();
Object.values(processorTypes).forEach( type =>{
	processorTypesMap.set(type.TYPE, type);
});


/**
 * Get the configuration for a processor
 *
 * This will merge in defaults, and set values from supplied configValues.
 * Does not provide callback functions for updating those values.
 * Those callback functions MUST get added before they are used in the default manner.
 *
 * @param {String} ID
 * @param {String} type
 * @param {Object} configFields Config fields for processor. Indexed by config ID.
 */
export const processorFactory = ( ID, type, configFields = {} ) =>  {
	let processor = {
		ID,
		type,
		configFields
	};
	if( processorTypesMap.has( type ) ){
		const configFieldDefaults =
			processorTypesMap.get( type ).hasOwnProperty( 'defaultConfigFields' )
				? processorTypesMap.get( type ).defaultConfigFields
				: {};

		processor.configFields = configFieldsFactory(configFields,configFieldDefaults);

	}
	return processor;

};