import {configFieldFactory} from './configFieldFactory';
import {configFieldsFactory} from './configFieldsFactory';
import {processorFactory} from './processorFactory';
import {processorTypes} from '../processors/processorTypes';


describe('Processor factories', () => {
	//A mock library is needed!
	const textFieldConfig = {
		'label': 'Tags',
		'description': 'Comma separated list of tags.',
		'type': 'text',
		'default': false
	};

	const defaultSequenceId = 42;
	const hiddenFieldConfig = {
		'type': 'hidden',
		'label': 'Sequence ID',
		'default': defaultSequenceId
	};

	const configFields = {
		tags: textFieldConfig,
		sequenceId: hiddenFieldConfig
	};

	describe('configFieldFactory', () => {
		it('Passes values from configField, even if present in  defaultConfigField', () => {
			expect(
				configFieldFactory(
					{
						description: 'Hi Roy'
					},
					hiddenFieldConfig
				).description ).toEqual('Hi Roy');
		});

		it('Sets configField.default from defaultConfigField', () => {
			expect(configFieldFactory(
				{
					description: 'Hi Roy'
				},
				hiddenFieldConfig
			).default).toEqual(defaultSequenceId);
		});

		it('Sets configField.label from defaultConfigField', () => {
			expect(configFieldFactory(
				{
					description: 'Hi Roy'
				},
				hiddenFieldConfig
			).label).toEqual('Sequence ID');
		});

	});

	describe('configFieldsFactory', () => {
		it('Returns an object ', () => {
			const processorConfigFields = configFieldsFactory(configFields);
			expect(typeof processorConfigFields ).toEqual('object');
		});

		it('Adds IDs to the fields ', () => {
			const processorConfigFields = configFieldsFactory(configFields);
			expect(processorConfigFields.tags.ID).toEqual('tags');
		});

		it( 'sets the defaults', () =>{
			expect(
				configFieldsFactory(
					{
						fromName: {
							value: 'Roy'
						}
					},
					{
						fromName: {
							label: 'From Name',
							type: 'email'
						}
					}
				)
			).toEqual( {
				fromName : {
					id: 'fromName',
					ID: 'fromName',
					value: 'Roy',
					label: 'From Name',
					type: 'email'
				}
			});
		});

		it( 'Add defaults for email processors', () => {
			const processor = processorFactory('p_l1', processorTypes.emailProcessorType.TYPE,{
				fromName: {
					'value': 'Josh Pollock'
				},
				fromEmail: {
					'value': 'Josh@calderaWP.com'

				},
				contentType: {
					value: 'plain',
				}
			});

			expect( typeof processor.configFields.fromName.label ).toBe( 'string' );
		});

	});

	describe( 'processorFactory', () => {

		it( 'Adds Id to result', () => {

			const processor = processorFactory( 'cf-s-1', processorTypes.emailProcessorType.TYPE, {
				fromName: {
					'value': 'Josh Pollock'
				},
				fromEmail: {
					'value': 'Josh@calderaWP.com'

				},
				contentType: {
					value: 'plain',
				}
			}  );
			expect( processor.ID ).toEqual( 'cf-s-1' );
		});

		it( 'Returns object of configFields', () => {
			const processor = processorFactory( 'cf-s-2', processorTypes.emailProcessorType.TYPE, {
				fromName: {
					'value': 'Josh Pollock'
				},
				fromEmail: {
					'value': 'Josh@calderaWP.com'
				},
				contentType: {
					value: 'plain',
				}
			});


			expect( typeof processor.configFields ).toBe( 'object');
		});

		it( 'adds configDefaults', () => {

			const processor = processorFactory( 'cf-s-3', processorTypes.emailProcessorType.TYPE, {
				fromName: {
					'value': 'Josh Pollock'
				},
				fromEmail: {
					'value': 'Josh@calderaWP.com'
				},
				contentType: {
					value: 'plain',
				}
			});


			expect( typeof processor.configFields.fromName.label ).toBe( 'string');
		});

		it( 'Keeps configField values in results', () => {

			const processor = processorFactory( 'cf-s-1', processorTypes.emailProcessorType.TYPE, {
				fromName: {
					'value': 'Josh Pollock'
				},
				fromEmail: {
					'value': 'Josh@calderaWP.com'

				},
				contentType: {
					value: 'plain',
				}
			}  );

			expect( processor.configFields.contentType.value  ).toBe( 'plain' );
		});

	});



});