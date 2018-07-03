import {processorSelectors} from "./processorSelectors";
import {select,dispatch} from '@wordpress/data';
import {processorDispatchers} from "./processorDispatchers";
import isShallowEqual from '@wordpress/is-shallow-equal';

let lastProcessors = new Map();
let skipOnce = new Map();

/**
 * Callback function that subscribes to processor store changes and handles validation
 */
export const validationSubscriber = () => {
	const form = {};
	const ownProps = {
		form
	};

	const processors = processorSelectors(select,ownProps).processors;
	processors.forEach( (procesor, processorId, processorsMap ) => {
		if( ! lastProcessors.has( processorId ) ||!  isShallowEqual(procesor,lastProcessors.get(processorId))){

			if( procesor.hasOwnProperty('configFields' ) && Object.keys(procesor.configFields).length ){
				lastProcessors.set( processorId, procesor );
				if (! skipOnce.has(processorId)) {
					skipOnce.set(processorId, true);
					processorDispatchers(dispatch, ownProps).validateProcessor(processorId);
				}else{
					skipOnce.delete(processorId);
				}
			}
		}


	});



};