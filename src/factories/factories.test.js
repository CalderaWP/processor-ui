import {configFieldFactory} from './configFieldFactory';
import {configFieldsFactory} from './configFieldsFactory';
import {processorFactory} from './processorFactory';
import {getConfigFieldDefaultValue, getConfigFieldValueOrDefault} from './util';
import {Processor} from '../processors/Processor';

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
		it('Parses defaults', () => {
			expect(configFieldFactory({
				description: 'Hi Roy'
			}, hiddenFieldConfig).description).toEqual('Hi Roy');
		});

		it('Sets value from default', () => {
			expect(configFieldFactory({
				description: 'Hi Roy'
			}, hiddenFieldConfig).value).toEqual(defaultSequenceId);
		});

		it('Sets configField.default from configFieldDefaults.default when needed', () => {
			expect(configFieldFactory(
				{
					description: 'Hi Roy'
				},
				{
					default: 'zooms'
				}
			).default).toEqual('zooms');
		});


		it('Sets missing value from configFieldDefaults.default when needed', () => {
			expect(configFieldFactory(
				{
					description: 'Hi Roy'
				},
				{
					default: 'zooms'
				}
			).value).toEqual('zooms');
		});
	});

	describe('configFieldsFactory', () => {
		it('Adds the fields ', () => {
			const processorConfigFields = configFieldsFactory(configFields);
			expect(processorConfigFields.has('tags')).toEqual(true);
			expect(processorConfigFields.has('sequenceId')).toEqual(true);
		});

		it('Adds IDs to the fields ', () => {
			const processorConfigFields = configFieldsFactory(configFields);
			expect(processorConfigFields.get('tags').ID).toEqual('tags');
			expect(processorConfigFields.get('sequenceId').ID).toEqual('sequenceId');
		});

		describe('Parses defaults properly', () => {
			it('Adds missing configFields', () => {
				const processorConfigFields = configFieldsFactory({
					tags: textFieldConfig,
				}, configFields);
				expect(processorConfigFields.has('sequenceId')).toEqual(true);
				expect(processorConfigFields.get('sequenceId').label).toEqual(hiddenFieldConfig.label);
			});

			it('Overrides defaults', () => {
				const newTagsField = Object.assign({}, textFieldConfig);
				newTagsField.type = 'select';
				const processorConfigFields = configFieldsFactory({
					tags: newTagsField,
				}, configFields);
				expect(processorConfigFields.get('tags').type).toEqual('select');

			});

			it('Adds missing config field defaults', () => {
				const newTagsField = {
					type: 'select'
				};
				const processorConfigFields = configFieldsFactory({
					tags: newTagsField,
				}, configFields);
				expect(processorConfigFields.has('tags')).toEqual(true);
				expect(processorConfigFields.get('tags').label).toEqual('Tags');
				expect(processorConfigFields.get('tags').default).toEqual(false);

			});


		});

		it('Sets fieldConfig.value to default when no field value is present ', () => {
			const processorConfigFields = configFieldsFactory(configFields, {}, new Map().set('tags', 'roy'));
			expect(processorConfigFields.get('sequenceId').value).toEqual(42);

		});

		it('Sets fieldConfig.value if configValues has a value to set', () => {
			const processorConfigFields = configFieldsFactory({
				tags: textFieldConfig,
			}, configFields, new Map().set('tags', 'roy'));
			expect(processorConfigFields.get('tags').value).toEqual('roy');

		});

		it('Adds in keys from default not in config', () => {
			const thisTestTextFieldConfig = {
				'label': 'r3s',

			};
			const thisTestConfigFields = {
				tags: thisTestTextFieldConfig,
				sequenceId: hiddenFieldConfig
			};

			const processorConfigFields = configFieldsFactory(thisTestConfigFields, configFields);
			expect(processorConfigFields.get('tags').label).toEqual(thisTestTextFieldConfig.label);
			expect(processorConfigFields.get('tags').type).toEqual('text');

		});

		describe('Priority of setting value', () => {
			const defaultConfigFieldValue = 'mike';
			const defaultsForThisTest = Object.assign({}, {
				tags: {
					default: 'mike',
				},
				sequenceId: hiddenFieldConfig
			});

			it('is testing with a valid mock for defaults', () => {
				expect(defaultsForThisTest.tags.default).toEqual('mike');
			});


			describe('Gives top priority to fieldValues[configFieldId]', () => {
				const processorConfigFields = configFieldsFactory(
					{
						tags: textFieldConfig,
						sequenceId: hiddenFieldConfig
					},
					Object.create(defaultsForThisTest),
					new Map().set('tags', 'roy')
				);
				expect(processorConfigFields.get('tags').value).not.toEqual(defaultConfigFieldValue);
			});

			describe('Uses config.Value as 2nd priority for setting value', () => {
				const processorConfigFields = configFieldsFactory(
					{
						tags: {
							default: 't1',
							label: 'Tags2'
						},
						sequenceId: hiddenFieldConfig
					},
					Object.create(defaultsForThisTest),
					new Map() //no values
				);

				it('Sets the value on fieldConfig from configFields', () => {
					expect(processorConfigFields.get('tags').value).toEqual('t1');
				});
			});

			describe('Uses configField.default as 3rd priority for setting value', () => {
				const processorConfigFields = configFieldsFactory(
					{
						tags: {
							label: 'Tags3',
							default: 'torpedo'
						},
						sequenceId: hiddenFieldConfig
					},
					Object.create(defaultsForThisTest),
					new Map() //no values
				);

				it('Sets the default on fieldConfig from defaultConfigFieldValue', () => {
					expect(processorConfigFields.get('tags').value).toEqual('torpedo');
				});
			});

			describe('Uses defaultConfigField.default as 4th priority for setting value', () => {

				it('Has the right default in mock', () => {
					expect(defaultsForThisTest.tags.default).toEqual('mike');
				});
				it('Uses getConfigFieldValueOrDefault as intended', () => {
					expect(getConfigFieldDefaultValue({default: 'mike'})).toEqual('mike');
					expect(getConfigFieldValueOrDefault({default: 'mike'})).toEqual('mike');
				});

				it('Sets the default on fieldConfig from defaultConfigFieldValue', () => {
					const processorConfigFields = configFieldsFactory(
						{
							tags: {
								label: 'Tags4',
							},
							sequenceId: hiddenFieldConfig
						},
						{
							tags: {
								default: 'mike',
							}
						},
						new Map() //no values
					);
					expect(processorConfigFields.get('tags').value).toEqual(defaultsForThisTest.tags.default);
				});
			});
		});
	});

	describe('Main processor factory', () => {
		describe('Matches type', () => {
			it('Returns correct class instance', () => {
				expect(processorFactory('robots', {})).toBeInstanceOf(Processor);
			});

			it('Returns correct class instance for email processor', () => {
				expect(processorFactory('email', {})).toBeInstanceOf(Processor);
			});

			it('Parse defaults', () => {
				const configFields = {
					fromEmail: {
						label: 'Butter Emails'
					}
				};
				let processor = processorFactory('email', configFields);

				expect(processor.getConfigFields().get( 'fromEmail' ).hasOwnProperty('label')).toEqual(true);
			});
		});
	});
});