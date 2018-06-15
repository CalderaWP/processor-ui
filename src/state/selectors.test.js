import {
	getFormForProcessor,
	getProcessor,
	getProcessorFromCollection,
	getProcessorValues,
	getProcessorValue
} from './selectors';

describe('selector functions',  () =>{
	const processorId = 'p111';
	const collection = new Map();
	const processor = {
		ID: processorId,
		type: 'email'
	};
	collection.set(processorId, {
		ID: 'p3',
		type: 'email'
	});

	const form = {
		ID: 'cf1',
		name: 'tacos'
	};

	collection.set(processorId, processor );

	describe( 'collection selectors', () => {
		it( 'selector the right processor from collection with getProcessorFromCollection',() =>{
			expect( getProcessorFromCollection(collection,processorId).ID ).toEqual( processorId );
		});
		it( 'returns null when getProcessorFromCollection selector is passed an invalid processor ID',() =>{
			expect( getProcessorFromCollection(collection,'p45') ).toEqual( null );
		});
	});

	describe( 'single processor selectors', () => {

		const mockState = {
			processor,
			form
		};
		it( 'selects the form in the processor state',  () => {

			expect( getFormForProcessor(mockState)).toEqual( form );
		});

		it( 'finds processor by ID', () =>{
			expect(getProcessor(mockState) ).toEqual(processor);
		});
	});

	describe( 'values selectors', () => {
		it( 'Returns the values',() => {
			const values = new Map().set( 'field1', 'too many 5s' );
			const thisMockState = {
				processor,
				form,
				configValues: values
			};
			expect( getProcessorValues( thisMockState)).toEqual(values);
		});

		it( 'Returns one value',() => {
			const values = new Map().set( 'field1', 'rs3' );
			const thisMockState = {
				processor,
				form,
				configValues: values
			};
			expect( getProcessorValue( thisMockState,'field1')).toEqual('rs3');
		});

		it( 'Returns null for invalid config field value',() => {
			const values = new Map().set( 'field1', 'rs3' );
			const thisMockState = {
				processor,
				form,
				configValues: values
			};
			expect( getProcessorValue( thisMockState,'field2')).toEqual(null);
		});
	});


});