import App from './App';
import {withSelect,withDispatch} from '@wordpress/data';
import {CALDERA_FORMS_PROCESSORS_STORE_SLUG} from './state/state';

/**
 * Main processors UI container wrapped with Redux(-like) state management
 */
const AppWithState =  withSelect( ( select, ownProps ) => {
	const { getCount } = select( CALDERA_FORMS_PROCESSORS_STORE_SLUG );

	return {
		quote: ownProps.quote,
		cite:getCount()
	};
} )( withDispatch( ( dispatch ) => {
	const { setCount } = dispatch( CALDERA_FORMS_PROCESSORS_STORE_SLUG );

	return {
		setCount(newCount) {
			setCount( newCount );
		},
	};
} )( App ) );


export default AppWithState;
