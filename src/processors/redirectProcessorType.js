export const REDIRECT_PROCESSOR_TYPE = 'caldera-forms/processor/redirect';

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