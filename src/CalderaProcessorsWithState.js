import CalderaProcessors from './CalderaProcessors';
import {withSelect,withDispatch} from '@wordpress/data';
import {CALDERA_FORMS_PROCESSORS_STORE_SLUG } from "./state/processorsStore";

/**
 * Main processors UI container wrapped with Redux(-like) state management
 */
const CalderaProcessorsWithState =  withSelect( (select, ownProps ) => {
	const {
		getProcessorsCollection,
		getProcessorTypes,
		getProcessorFromCollection,
	} = select(CALDERA_FORMS_PROCESSORS_STORE_SLUG);
	const processors = getProcessorsCollection();
	const processorTypes = getProcessorTypes();
	return {
		getProcessorFromCollection,
		processors,
		processorTypes,
		getProcessorTypes,
		form: ownProps.form
	};
} )( withDispatch( ( dispatch ) => {
	const {
		addProcessor,
		newProcessor,
		removeProcessor,
		updateProcessor,
		setProcessorType
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
		},
		onUpdateProcessorType(processorType, processorTypeIdentifier){
			setProcessorType(processorType, processorTypeIdentifier)
		}
	};
} )( CalderaProcessors ) );


export default CalderaProcessorsWithState;
