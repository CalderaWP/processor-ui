import {emailDefaultConfigFields} from './emailDefaultConfigFields';
export const EMAIL_PROCESSOR_TYPE = 'caldera-forms/procesor/email';

/**
 * The email processor type
 */
export default {
	TYPE: EMAIL_PROCESSOR_TYPE,
	LABEL: 'Email',
	defaultConfigFields: emailDefaultConfigFields
};