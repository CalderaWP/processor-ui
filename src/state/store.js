import { registerStore } from '@wordpress/data';
import {CALDERA_FORMS_PROCESSORS_STORE_SLUG,processorStore} from './state';
export const store = registerStore( CALDERA_FORMS_PROCESSORS_STORE_SLUG, processorStore );