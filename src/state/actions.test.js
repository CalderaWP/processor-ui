import {
	addProcessor,
	newProcessor,
	removeProcessor,
	setFormForProcessor,
	updateProcessor,
	updateProcessorValues,
	ADD_PROCESSOR,
	NEW_PROCESSOR,
	REMOVE_PROCESSOR,
	SET_FORM_FOR_PROCESSOR,
	UPDATE_PROCESSOR,
	UPDATE_PROCESSOR_VALUES
} from './actions';

describe( 'action creators', () => {
	const processorId = 'p11';
	const processor = {
		ID: processorId,
		type: 'email'
	};
	const form = {
		ID: 'CF1',
		name: 'Contact Form'
	};
	describe( 'actions for processors collection', () => {
		it( 'addProcessor action creator create the right type of action', () =>{
			const action = addProcessor(processor);
			expect( action.type ).toBe( ADD_PROCESSOR );
		});

		it( 'addProcessor action creator create the right payload', () =>{
			const action = addProcessor(processor);
			expect( action.processor ).toBe( processor );
		});

		it( 'newProcessor action creator create the right type of action', () =>{
			const action = newProcessor(processor);
			expect( action.type ).toBe( NEW_PROCESSOR );
		});

		it( 'removeProcessor action creator create the right type of action', () =>{
			const action = removeProcessor(processor);
			expect( action.type ).toBe( REMOVE_PROCESSOR );
		});

		it( 'removeProcessor action creator create the right payload', () =>{
			const action = removeProcessor(processorId);
			expect( action.processorId ).toBe( processorId );
		});

		it( 'setFormForProcessor action creator create the right type of action', () =>{
			const action = setFormForProcessor(form);
			expect( action.type ).toBe( SET_FORM_FOR_PROCESSOR );
		});

		it( 'setFormForProcessor action creator create the right payload', () =>{
			const action = setFormForProcessor(form);
			expect( action.form ).toBe( form );
		});


		it( 'updateProcessor action creator create the right type of action', () =>{
			const action = updateProcessor(processor);
			expect( action.type ).toBe( UPDATE_PROCESSOR );
		});

		it( 'updateProcessor action creator create the right payload', () =>{
			const action = updateProcessor(processor);
			expect( action.processor ).toBe( processor );
		});

		it( 'updateProcessorValues action creator create the right type of action', () =>{
			const action = updateProcessorValues(processor);
			expect( action.type ).toBe( UPDATE_PROCESSOR_VALUES );
		});

		it( 'updateProcessorValues action creator create the right paylaod', () =>{
			const action = updateProcessorValues(processor);
			expect( action.configValues ).toBe( processor );
		});
	});
});