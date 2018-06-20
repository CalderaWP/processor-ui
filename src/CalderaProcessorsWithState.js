import CalderaProcessors from './CalderaProcessors';
import {withSelect,withDispatch} from '@wordpress/data';
import {CALDERA_FORMS_PROCESSORS_STORE_SLUG } from "./state/processorsStore";

/**
 * Main processors UI container wrapped with Redux(-like) state management
 */
const CalderaProcessorsWithState =  withSelect( (select, ownProps ) => {
	const {getProcessorsCollection } = select(CALDERA_FORMS_PROCESSORS_STORE_SLUG);
	return {
		processors: getProcessorsCollection(),
		form: ownProps.form
	};
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
} )( CalderaProcessors ) );


export default CalderaProcessorsWithState;
