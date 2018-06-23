import {processorsStore} from './processorsStore';
import {
	newProcessor,
} from './actions';


describe( 'wp.data stores', () => {
	describe( 'Processors store', () => {
		it( 'Can reduce with actions', () => {
			const action = newProcessor();
			processorsStore.dispatch(action);
			expect(processorsStore.getState().processorsReducer.size).toBe(1);
		});

	});

});