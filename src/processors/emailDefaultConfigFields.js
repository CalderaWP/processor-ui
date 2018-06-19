
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
				value: 'HTML',
				label: 'HTML',
			},
			{
				value: 'plain',
				label: 'Plain Text',
			}
		],
		default: 'HTML'
	}
};

Object.keys( emailDefaultConfigFields ).forEach( key => {
	emailDefaultConfigFields[key].id = key;
});