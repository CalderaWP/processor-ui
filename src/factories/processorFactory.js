import {emailDefaultConfigFields} from '../processors/emailDefaultConfigFields';
import {configFieldsFactory} from './configFieldsFactory';

export const processorTypes = new Map()
	.set('email', {
		defaultConfigFields: emailDefaultConfigFields
	} );

processorTypes.set( 'redirect', {
	url: {
		'label': 'Redirect Url',
		'desc': 'URL to redirect to',
		'type': 'text',
	},
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
	if( processorTypes.has( type ) ){
		const configFieldDefaults =
			processorTypes.get( type ).hasOwnProperty( 'defaultConfigFields' )
				? processorTypes.get( type ).defaultConfigFields
				: {};

		processor.configFields = configFieldsFactory(configFields,configFieldDefaults);

	}
	return processor;

};