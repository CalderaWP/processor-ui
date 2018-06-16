import App from './App';
import {withSelect,withDispatch} from '@wordpress/data';
import {CALDERA_FORMS_PROCESSORS_STORE_SLUG } from "./state/processorsStore";
import {CALDERA_FORMS_PROCESSOR_STORE_SLUG } from "./state/processorStore";

/**
 * Main processors UI container wrapped with Redux(-like) state management
 */
const AppWithState =  withSelect( ( select, ownProps ) => {

	return {
		processors: ownProps.quote,
		cite:getCount()
	};
} )( withDispatch( ( dispatch ) => {
	return {

	};
} )( App ) );


export default AppWithState;
