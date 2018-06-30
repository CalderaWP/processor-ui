import React from 'react';
import ReactDOM from 'react-dom';
import CalderaProcessorsUI from './CalderaProcessorsUI';
import renderer from 'react-test-renderer';

describe( 'Processor UI factory', () => {
	it( 'Mounts without crashing', () => {
		const CalderaProcessors = new CalderaProcessorsUI('processor-ui-rest-1');
		ReactDOM.render(
			CalderaProcessors.componentWithState(),
			document.createElement('processor-ui-rest-1')
		)
	});

	it( 'Renders without crashing', () => {
		const CalderaProcessors = new CalderaProcessorsUI('processor-ui-rest-1b');
		const component = renderer.create(
			<div>
				{CalderaProcessors.componentWithState()}
			</div>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	});

	it( 'Can be used to access processor store', () => {
		const CalderaProcessors = new CalderaProcessorsUI('processor-ui-rest-2');
		expect( typeof CalderaProcessors.getProcessorStore() ).toEqual('object' );
	});

	it( 'Could be used to subscribe to processor store', () => {
		const CalderaProcessors = new CalderaProcessorsUI('processor-ui-rest-3');
		expect( typeof CalderaProcessors.getProcessorStore().subscribe ).toEqual('function' );
	});

	it( 'Could be used to dispatch to processor store', () => {
		const CalderaProcessors = new CalderaProcessorsUI('processor-ui-rest-4');
		expect( typeof CalderaProcessors.getProcessorStore().dispatch ).toEqual('function' );
	});

	it( 'Can setup validation subscription', () => {
		const CalderaProcessors = new CalderaProcessorsUI('processor-ui-rest-5');
		expect( CalderaProcessors.subscribeForValidation() ).toEqual(true);
	});

	it( 'Can setup validation subscription and then unsubscribe', () => {
		const CalderaProcessors = new CalderaProcessorsUI('processor-ui-rest-6');
		CalderaProcessors.subscribeForValidation();
		expect( CalderaProcessors.unSubscribeToProcessorValidation() ).toEqual(true);
	});

	it( 'returns false instead of making errors if unsubscribe is called before subscribe', () => {
		const CalderaProcessors = new CalderaProcessorsUI('processor-ui-rest-7');
		expect( CalderaProcessors.unSubscribeToProcessorValidation() ).toEqual(false);
	});

	it( 'Stops thinking its subscribed when its no longer subscribed', () => {
		const CalderaProcessors = new CalderaProcessorsUI('processor-ui-rest-8');
		CalderaProcessors.subscribeForValidation();
		CalderaProcessors.unSubscribeToProcessorValidation();
		expect( CalderaProcessors.unSubscribeToProcessorValidation() ).toEqual(false);
	});
});