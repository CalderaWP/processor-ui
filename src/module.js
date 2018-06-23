/*eslint no-undef: "error"*/
/*eslint-env node*/
import CalderaProcessors from './CalderaProcessors';
import CalderaProcessorsWithState from './CalderaProcessorsWithState';
import {processorsStore} from './state/processorsStore';
export default  {
	CalderaProcessors,
	CalderaProcessorsWithState,
	processorsStore
}
