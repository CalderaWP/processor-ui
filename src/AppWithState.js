import App from './App';
import {withSelect,withDispatch} from '@wordpress/data';
import {CALDERA_FORMS_PROCESSORS_STORE_SLUG } from "./state/processorsStore";
//import {CALDERA_FORMS_PROCESSOR_STORE_SLUG } from "./state/processorStore";

/**
 * Main processors UI container wrapped with Redux(-like) state management
 */
const AppWithState =  withSelect( ( select, ownProps ) => {
	const {getProcessorsCollection } = select(CALDERA_FORMS_PROCESSORS_STORE_SLUG);
	const state = {
		processors: getProcessorsCollection(),
		form:ownProps.form
	};
	return state;
} )( withDispatch( ( dispatch ) => {
	const {
		addProcessor,
		newProcessor,
		removeProcessor,
		updateProcessor
	} = dispatch( CALDERA_FORMS_PROCESSORS_STORE_SLUG );
	return {
		onAddProcessor(processorConfig) {
			addProcessor( processorConfig );
		},
		onNewProcessor(){
			newProcessor()
		},
		onRemoveProcessor(processorId){
			removeProcessor(processorId);
		},
		onUpdateProcessor(processor){
			updateProcessor(processor);
		}
	};
} )( App ) );


export default AppWithState;
