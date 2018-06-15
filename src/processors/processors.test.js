import {Processor} from "./Processor";
import {Email} from "./Email";

describe( 'Processor classes', () => {
	//A mock library is needed!
	const textFieldId = 'text-field';
	const textFieldConfig = {
		'id': textFieldId,
		'label': 'Tags',
		'desc': 'Comma separated list of tags.',
		'type': 'text',
		'description': false
	};

	const hiddenFieldId = 'hidden-field';
	const hiddenFieldConfig = {
		'id': hiddenFieldId,
		'type': 'hidden',
		'label': 'Sequence ID',
		'description': false
	};

	const selectFieldId = 'select-field';
	const selectFieldConfig = {
		'id': selectFieldId,
		'label': 'Sequence',
		'type': 'select',
		'options': [],
		'desc': 'ConvertKit sequence to add subscriber to. Sequences are also referred to as courses.',
		'description': false,
		'extra_classes': 'selectFieldConfig-custom-class',//HEY JOSH !! SUPPORT THIS!
		'magic': false
	};

	const configFields = [
		hiddenFieldConfig,
		selectFieldConfig,
		textFieldConfig
	];

	const configValues = new Map()
		.set(textFieldId, 'hats,bats' )
		.set( hiddenFieldId, '42' );

	describe( 'Processor base class', () =>{

		describe( 'config fields property', () => {
			it( 'can set and reset config fields', () =>{
				const processor = new Processor();
				processor.setConfigFields(configFields);
				expect( processor.getConfigFields() ).toEqual(configFields);
			});

			it( 'Will set config fields through constructor', () => {
				const processor = new Processor(configFields);
				expect( processor.getConfigFields() ).toEqual(configFields);
			});

			it( 'Knows it does not have default config fields', () => {
				const processor = new Processor();
				expect( processor.hasDefaultConfigFields() ).toEqual(false);
			});

			it( 'Knows it does have default config fields', () => {
				const processor = new Email();
				expect( processor.hasDefaultConfigFields() ).toEqual(true);
			});

		});

		describe( 'config values property', () => {
			it( 'can set and reset config values', () =>{
				const processor = new Processor();
				processor.setConfigValues(configValues);
				expect( processor.getConfigValues() ).toEqual(configValues);
			});

			it( 'Will set config values through constructor', () => {
				const processor = new Processor({},configValues);
				expect( processor.getConfigValues() ).toEqual(configValues);
			});

		});

	});
});