export const CALDERA_FORMS_PROCESSORS_STORE_SLUG = 'CALDERA_FORMS_PROCESSORS_STORE_SLUG';
export const DEFAULT_STATE = {
	processors: [],
	count: 55
};
export  const processorStore = {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
		case 'SET_PRICE':
			return {
				...state,
				count:action.newCount
			};
		default:
			return state;
		}

	},

	actions: {
		setCount( newCount ) {
			return {
				type: 'SET_PRICE',
				newCount
			};
		},


	},

	selectors: {
		getCount(state) {
			return state.count.toString();
		},
	},

	resolvers: {
		async getPrice(state, item) {

		},
	},
};