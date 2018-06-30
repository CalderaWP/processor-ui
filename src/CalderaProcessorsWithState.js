import CalderaProcessors from './CalderaProcessors';
import {withSelect, withDispatch} from '@wordpress/data';
import {processorSelectors} from "./state/processorSelectors";
import {processorDispatchers} from "./state/processorDispatchers";

/**
 * Main processors UI container wrapped with Redux(-like) state management
 */
const CalderaProcessorsWithState =
	withSelect(processorSelectors)(withDispatch(processorDispatchers)(CalderaProcessors));

export default CalderaProcessorsWithState;
