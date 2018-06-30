import {CALDERA_FORMS_PROCESSORS_STORE_SLUG} from "./processorsStore";

export const processorDispatchers = ( dispatch ) => {
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
}