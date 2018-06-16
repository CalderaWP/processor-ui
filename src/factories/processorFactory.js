import {emailDefaultConfigFields} from '../processors/emailDefaultConfigFields';
import {Processor} from '../processors/Processor';
import {configFieldsFactory} from './configFieldsFactory';

export const processorTypes = new Map()
	.set('email', {
		defaultConfigFields: emailDefaultConfigFields
	} );

export const processorFactory = (type,configFields,configValues) =>  {
	let processor = new Processor();
	if( processorTypes.has( type ) ){
		const configFieldDefaults = processorTypes.get( type ).hasOwnProperty( 'defaultConfigFields' )
			? processorTypes.get( type ).defaultConfigFields
			: {};
		processor.setConfigFields( configFieldsFactory(configFields,configFieldDefaults));

	}else{
		processor.setConfigFields( configFields );
	}


	processor.setConfigValues( configValues);
	return processor;

};