import {processorsStore} from './processorsStore';
import {
	newProcessor,
} from './actions';

import {processorTypesStoreConfig} from './processorTypesStore';

describe( 'wp.data stores', () => {
	describe( 'Processors store', () => {
		it( 'Can reduce with actions', () => {
			const action = newProcessor();
			processorsStore.dispatch(action);
			expect(processorsStore.getState().size).toBe(1);
		});

	});

	describe( 'Processor types store ', () => {
		it( 'Has reducer in config ', () => {
			expect( typeof processorTypesStoreConfig ).toBe( 'object');
		});
	});
});