import {
	processorReducer,
	CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE,
	processorsReducer,
	CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE,
	processorTypesReducer
} from './reducers';
import {
	addProcessor,
	newProcessor,
	removeProcessor,
	setFormForProcessor,
	updateProcessor,
	updateProcessorValues,
	updateProcessorConfigFields,
	setProcessorType,
	validateProcessor
} from './actions';
import emailProcessorType from '../processors/emailProcessorType';
import redirectProcessorType from '../processors/redirectProcessorType';
import {processorTypesMap} from '../factories/processorFactory';


import {validation} from '@caldera-labs/components';
import {configFieldFactory} from "../factories/configFieldFactory";
import {configFieldsFactory} from "../factories/configFieldsFactory";
validation.addAutomaticValidators({
	ID: 'fld1',
	type: 'input',
	inputType: 'url',
	isRequired: false,
})

describe('reducers', () => {
	const initAction = {type: 'init'};
	const emailProcessorId = 'p11';
	const emailProcessor = {
		ID: emailProcessorId,
		type: emailProcessorType.TYPE,
		configFields: {}
	};
	const form = {
		ID: 'CF1',
		name: 'Contact Form',
		fields: {}
	};

	describe( 'validating processor', () => {
		const processorId = 'p71a';
		let configFields = emailProcessorType.defaultConfigFields;
		Object.keys( configFields ).forEach(configFieldId => {
			configFields[configFieldId] = validation.addAutomaticValidators(configFields[configFieldId]);
			configFields[configFieldId].value = 'roy';
		});

		configFields = configFieldsFactory(configFields);
		const processor = {
			...emailProcessor,
			ID: processorId,
			configFields: emailProcessorType.defaultConfigFields
		};

		it( 'adds validation results when validating', () => {
			const store = processorsReducer(new Map().set( processorId,processor), validateProcessor(processorId));
			expect(typeof store.get( processorId ).validationResults ).toEqual('object');
		});

		it( 'adds message object when validating', () => {
			const store = processorsReducer(new Map().set( processorId,processor), validateProcessor(processorId));
			expect(typeof store.get( processorId ).configFields.fromEmail.message ).toEqual('object');
		});

		it( 'adds an error message object when validating and there is an error', () => {
			const store = processorsReducer(new Map().set( processorId,processor), validateProcessor(processorId));
			expect( store.get( processorId ).configFields.fromEmail.message.error ).toEqual(true);
		});

		it( 'adds the right error message object when validating and there is an error', () => {
			const store = processorsReducer(new Map().set( processorId,processor), validateProcessor(processorId));
			expect( store.get( processorId ).configFields.fromEmail.message.message ).toEqual('This value should be a valid email.');
		});


	});



	describe('Processors collection reducer', () => {
		it('Returns state for other actions', () => {
			const store = processorsReducer({a: 1}, initAction);
			expect({a: 1}).toEqual(store);
		});

		it('Sets defaults', () => {
			const store = processorsReducer(CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE, initAction);
			expect(CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE).toEqual(store);
		});

		it('Returns a map when adding new processor to the collection', () => {
			const action = addProcessor(emailProcessor);
			const store = processorsReducer(new Map(), action);
			expect(store instanceof Map).toBeTruthy();
		});

		it('Adds a processor to the collection', () => {
			const action = addProcessor(emailProcessor);
			const store = processorsReducer(new Map(), action);
			expect(store.has(emailProcessorId)).toEqual(true);
		});

		it('Returns a map when adding a processor to the collection', () => {
			const action = newProcessor();
			const store = processorsReducer(new Map(), action);
			expect(store instanceof Map).toBeTruthy();
		});

		it('Adds a new empty processor to the collection', () => {
			const action = newProcessor();
			const store = processorsReducer(new Map(), action);
			expect(store.size).toEqual(1);
		});

		it('New processors have ID', () => {
			const action = newProcessor();
			const store = processorsReducer(new Map(), action);
			expect(typeof store.values().next().value.ID).toEqual('string');
		});

		it('New processors have empty prepareConfigFields', () => {
			const action = newProcessor();
			const store = processorsReducer(new Map(), action);
			expect(typeof store.values().next().value.configFields).toEqual('object');
		});


		it('Returns a map when removing a processor from the collection', () => {
			const action = removeProcessor(emailProcessorId);
			const store = processorsReducer(new Map().set(emailProcessorId, emailProcessor), action);
			expect(store instanceof Map).toBeTruthy();
		});

		it('Removes a processor from collection', () => {
			const action = removeProcessor(emailProcessorId);
			const store = processorsReducer(new Map().set(emailProcessorId, emailProcessor), action);
			expect(store.size).toEqual(0);
		});

		it('Updates the right processor in processors collection', () => {
			const action = updateProcessor({
				ID: emailProcessorId,
				type: redirectProcessorType.TYPE,
				configFields: {}

			});

			const processors = new Map();

			processors.set(emailProcessorId, emailProcessor);
			processors.set('p222', {
				type: emailProcessorType.TYPE,
				configFields: {}
			});
			const store = processorsReducer(processors, action);
			expect(store.get(emailProcessorId).type).toEqual(redirectProcessorType.TYPE);
		});


		it('Updates the config fields to match the type of processor', () => {
			const action = updateProcessor({
				ID: emailProcessorId,
				type: emailProcessorType.TYPE,
				configFields: {}

			});

			const processors = new Map();
			processors.set('p23', {
				type: 'email',
				configFields: {}

			});
			processors.set(emailProcessorId, {
				ID: emailProcessorId,
				type: redirectProcessorType.TYPE,
				configFields: {}
			});
			processors.set('p2111', {
				type: emailProcessorType.TYPE,
				configFields: {}

			});
			const store = processorsReducer(processors, action);
			expect(store.get(emailProcessorId).type).toEqual(emailProcessorType.TYPE);
			expect(store.get(emailProcessorId).configFields.hasOwnProperty('fromName')).toBe(true);

		});


	});

	describe('Processor reducer', () => {

		it('Returns state for other actions', () => {
			const store = processorReducer({a: 1}, {type: 'some-one-else/some-thing-else'});
			expect({a: 1}).toEqual(store);
		});

		it('Sets defaults', () => {
			const store = processorReducer(CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE, {type: 'some-one-else/some-thing-else'});
			expect(CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE).toEqual(store);
		});

		it('Updates processor', () => {
			const action = updateProcessor({
				ID: emailProcessorId,
				type: 'redirect'
			});
			const store = processorReducer({
				processor: {}
			}, action);
			expect(store.processor.type).toEqual('redirect');
		});


		it('Sets the processor\'s form', () => {
			const action = setFormForProcessor(form);
			const store = processorReducer({
				processor: new Map().set(emailProcessorId, emailProcessor)
			}, action);
			expect(store.form).toEqual(form);
		});

		it('Sets the processor values', () => {
			const values = new Map().set('1', 1);
			const action = updateProcessorValues(values);
			const store = processorReducer(CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE, action);
			expect(store.configValues).toEqual(values);
		});

		it('Updates processor prepareConfigFields', () => {
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

			const action = updateProcessorConfigFields(configFields);
			const store = processorReducer(CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE, action);
			expect(store.configFields).toEqual(configFields);

		});

	});

	describe( 'processor types reducer', () => {
		it( 'has the defaults', () => {
			const state = processorTypesReducer(processorTypesMap,{type: 'INIT'});
			expect(state.size).toBe(processorTypesMap.size);
		});
		it( 'Can update a default processor', () => {
			const action = setProcessorType( {
				...emailProcessorType,
				configFields: []

			}, emailProcessorType.TYPE);
			const state = processorTypesReducer(processorTypesMap,action);
			expect(state.get( emailProcessorType.TYPE).configFields).toEqual([]);
		});

		const type11 =  {
			TYPE: 'type11',
			configFields: [],
			LABEL: 'Custom processor'
		};

		it( 'Can add a custom processor', () => {
			const action = setProcessorType( type11, type11.TYPE);
			const state = processorTypesReducer(processorTypesMap,action);
			expect(state.get( type11.TYPE)).toEqual(type11);
		});

		it( 'updates a custom processor', () => {
			const action = setProcessorType( type11, type11.TYPE);
			let state = processorTypesReducer(processorTypesMap,action);
			state = processorTypesReducer(state,
				setProcessorType( {
					...type11,
					LABEL: 'Hi Roy'
				}, type11.TYPE )
			);
			expect( state.get( type11.TYPE ).LABEL ).toBe( 'Hi Roy' );
		});
	});
});