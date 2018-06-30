export const REDIRECT_PROCESSOR_TYPE = 'caldera-forms/processor/redirect';

/**
 * The redirect processor type
 */
export default {
	TYPE: REDIRECT_PROCESSOR_TYPE,
	LABEL: 'Redirect After Form Submission',
	defaultConfigFields: {
		url: {
			'label': 'Redirect Url',
			'desc': 'URL to redirect to',
			'type': 'text',
		},
	}
};