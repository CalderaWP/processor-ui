const contentTypeHtmlValueIdentifier = 'html';
export const emailDefaultConfigFields = {
	fromName: {
		'label': 'From Name',
		'desc': 'Who the email is from',
		'type': 'text',
		'default': 'Roy Sivan'
	},
	fromEmail: {
		'label': 'From Email',
		'desc': 'Who the email is from',
		'type': 'email',
	},
	contentType: {
		'label': 'Content type',
		'desc': 'HTML or plain text?',
		'type': 'select',
		'options': [
			{
				value: contentTypeHtmlValueIdentifier,
				label: 'HTML',
			},
			{
				value: 'plain',
				label: 'Plain Text',
			}
		],
		default: contentTypeHtmlValueIdentifier
	},
	bodyPadding: {
		'label': 'Message Body Padding',
		'desc': 'How much space to add around message body',
		'type': 'number',
		'conditionals' : [
			(values) => {
				return contentTypeHtmlValueIdentifier === values.contentType;
			}
		]
	},
};

Object.keys( emailDefaultConfigFields ).forEach( key => {
	emailDefaultConfigFields[key].id = key;
});