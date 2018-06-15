import {
	processorReducer,
	CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE,
	processorsReducer,
	CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE
} from './reducers';

import {
	addProcessor,
	newProcessor,
	removeProcessor,
	setFormForProcessor,
	updateProcessor,
	updateProcessorValues
} from './actions';

describe( 'reducers', () => {
	const initAction = {type: 'init'};
	const processorId = 'p11';
	const processor = {
		ID: processorId,
		type: 'email'
	};
	const form = {
		ID: 'CF1',
		name: 'Contact Form'
	};


	describe( 'Processors collection reducer', () => {
		it('Returns state for other actions', () => {
			const store = processorsReducer({a: 1}, initAction);
			expect({a: 1}).toEqual(store);
		});

		it('Sets defaults', () => {
			const store = processorsReducer(CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE, initAction);
			expect(CALDERA_FORMS_PROCESSORS_STORE_DEFAULT_STATE).toEqual(store);
		});

		it( 'Returns a map when adding new processor to the collection', () => {
			const action = addProcessor(processor);
			const store = processorsReducer(new Map(), action);
			expect(store instanceof Map).toBeTruthy();
		});

		it( 'Adds a processor to the collection', () => {
			const action = addProcessor(processor);
			const store = processorsReducer(new Map(), action);
			expect(store.has(processorId)).toEqual(true);
		});

		it( 'Returns a map when adding a processor to the collection', () => {
			const action = newProcessor();
			const store = processorsReducer(new Map(), action);
			expect(store instanceof Map).toBeTruthy();
		});

		it( 'Adds a new empty processor to the collection', () => {
			const action = newProcessor();
			const store = processorsReducer(new Map(), action);
			expect(store.size).toEqual(1);
		});

		it( 'Returns a map when removing a processor from the collection', () => {
			const action = removeProcessor(processorId);
			const store = processorsReducer(new Map().set(processorId,processor), action);
			expect(store instanceof Map).toBeTruthy();
		});

		it( 'Removes a processor from collection', () => {
			const action = removeProcessor(processorId);
			const store = processorsReducer(new Map().set(processorId,processor), action);
			expect(store.size).toEqual(0);
		});
	});

	describe( 'Processor reducer', () => {

		it('Returns state for other actions', () => {
			const store = processorReducer({a: 1}, {type: 'some-one-else/some-thing-else'});
			expect({a: 1}).toEqual(store);
		});

		it('Sets defaults', () => {
			const store = processorReducer(CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE, {type: 'some-one-else/some-thing-else'});
			expect(CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE).toEqual(store);
		});

		it( 'Updates processor', () => {
			const action = updateProcessor({
				ID: processorId,
				type: 'redirect'
			});
			const store = processorReducer({
				processor: new Map().set( processorId, processor )
			}, action);
			expect(store.processor.type).toEqual('redirect');
		});

		it( 'Sets the processor\'s form', () => {
			const action = setFormForProcessor(form);
			const store = processorReducer({
				processor: new Map().set( processorId, processor )
			}, action);
			expect(store.form).toEqual(form);
		});

		it( 'Sets the processor values', () => {
			const values = new  Map( ).set( '1', 1 );
			const action = updateProcessorValues(values);
			const store =  processorReducer(CALDERA_FORMS_PROCESSOR_STORE_DEFAULT_STATE,action);
			expect( store.configValues ).toEqual( values );
		});


	});
});