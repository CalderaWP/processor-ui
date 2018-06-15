import {
	getFormForProcessor,
	getProcessor,
	getProcessorFromCollection
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
		const form = {
			ID: 'cf1',
			name: 'tacos'
		};
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

});