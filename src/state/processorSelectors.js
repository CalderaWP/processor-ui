import {CALDERA_FORMS_PROCESSORS_STORE_SLUG} from './processorsStore';

/**
 * Processor related selectors wrapped with select from processor store
 * @param select
 * @param ownProps
 * @return {{getProcessorFromCollection: *, processors: *, processorTypes: *, getProcessorTypes: *, form: *}}
 */
export const processorSelectors = (select, ownProps ) => {
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
		form: 'object' === typeof ownProps.form ? ownProps.form : {}
	};
};