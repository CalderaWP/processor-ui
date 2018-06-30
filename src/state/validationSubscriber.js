import {processorSelectors} from "./processorSelectors";
import {select} from '@wordpress/data'

export const validationSubscriber = () => {
	const form = {};
	const ownProps = {
		form
	};
	const processors = processorSelectors(select,ownProps).processors;
	const processorTypes = processorSelectors(select,ownProps).getProcessorTypes;
	console.log(
		processors,
		processorTypes
	)
}