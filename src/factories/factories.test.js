import {configFieldFactory} from "./configFieldFactory";
import {configFieldsFactory} from "./configFieldsFactory";

describe( 'Processor factories', () => {
	//A mock library is needed!
	const textFieldConfig = {
		'label': 'Tags',
		'description': 'Comma separated list of tags.',
		'type': 'text',
		'default': false
	};

	const hiddenFieldConfig = {
		'type': 'hidden',
		'label': 'Sequence ID',
		'default': 42
	};

	const configFields = {
		tags: textFieldConfig,
		sequenceId: hiddenFieldConfig
	};

	describe('configFieldFactory', () => {
		it( 'Parses defaults', () => {
			expect(configFieldFactory({
				description: 'Hi Roy'
			},hiddenFieldConfig).description).toEqual( 'Hi Roy');
		});
	});

	describe( 'configFieldsFactory', () => {
		it( 'Adds the fields ', () => {
			const processorConfigFields = configFieldsFactory(configFields);
			expect( processorConfigFields.has( 'tags'  ) ).toEqual( true );
			expect( processorConfigFields.has( 'sequenceId'  ) ).toEqual( true );
		});

		it( 'Adds IDs to the fields ', () => {
			const processorConfigFields = configFieldsFactory(configFields);
			expect( processorConfigFields.get( 'tags'  ).ID ).toEqual( 'tags' );
			expect( processorConfigFields.get( 'sequenceId'  ).ID ).toEqual( 'sequenceId' );
		});

		describe( 'Parses defaults properly', () => {
			it( 'Adds missing configFields', () =>{
				const processorConfigFields = configFieldsFactory({
					tags: textFieldConfig,
				},configFields);
				expect( processorConfigFields.has( 'sequenceId'  ) ).toEqual( true );
				expect( processorConfigFields.get( 'sequenceId'  ).label ).toEqual( hiddenFieldConfig.label );
			});

			it( 'Overrides defaults', () => {
				const newTagsField = Object.assign({}, textFieldConfig);
				newTagsField.type = 'select';
				const processorConfigFields = configFieldsFactory({
					tags: newTagsField,
				},configFields);
				expect( processorConfigFields.get( 'tags'  ).type ).toEqual( 'select' );

			});

			it( 'Adds missing config field defaults', () => {
				const newTagsField = {
					type: 'select'
				};
				const processorConfigFields = configFieldsFactory({
					tags: newTagsField,
				},configFields);
				expect( processorConfigFields.has( 'tags'  ) ).toEqual( true );
				expect( processorConfigFields.get( 'tags'  ).label ).toEqual( 'Tags' );

			});

		});

		it( 'Sets fieldConfig.value to default when no field value is present ', () => {
			const processorConfigFields = configFieldsFactory(configFields,{},new Map().set( 'tags', 'roy'));
			expect( processorConfigFields.get( 'sequenceId'  ).value ).toEqual( 42 );

		});

		it( 'Sets fieldConfig.value if configValues has a value to set', () => {
			const processorConfigFields = configFieldsFactory({
				tags: textFieldConfig,
			},configFields, new Map().set( 'tags', 'roy'));
			expect( processorConfigFields.get( 'tags'  ).value ).toEqual( 'roy' );

		});
	});
});