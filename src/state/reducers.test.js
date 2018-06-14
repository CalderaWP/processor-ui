import {processorsReducer,CALDERA_FORMS_PROCESSORS_STORE_DEFUALT_STATE} from './reducers';

describe( 'reducers', () => {
	describe( 'Processor reducer', () => {
		it('Returns state for other actions', () => {
			const store = processorsReducer({a: 1}, {action: 'some-one-else/some-thing-else'});
			expect({a: 1}).toEqual(store);
		});

		it('Sets defaults', () => {
			const store = processorsReducer(CALDERA_FORMS_PROCESSORS_STORE_DEFUALT_STATE, {action: 'some-one-else/some-thing-else'});
			expect(CALDERA_FORMS_PROCESSORS_STORE_DEFUALT_STATE).toEqual(store);
		});

	});
});