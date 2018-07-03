/**
 * The identifier for the value for the content type option that represents HTML emails
 *
 * @type {string}
 */
const contentTypeHtmlValueIdentifier = 'html';
/**
 * The default fields for email processors
 *
 * @type {{fromName: {label: string, desc: string, type: string, default: string}, fromEmail: {label: string, desc: string, type: string}, contentType: {label: string, desc: string, type: string, options: *[], default: string}, bodyPadding: {label: string, desc: string, type: string, conditionals: *[]}}}
 */
export const emailDefaultConfigFields = {
	fromName: {
		'label': 'From Name',
		'desc': 'Who the email is from',
		'type': 'input',
		'inputType': 'text',
		'default': 'Roy Sivan',
		isRequired: true,
	},
	fromEmail: {
		'label': 'From Email',
		'desc': 'Who the email is from',
		'type': 'input',
		'inputType': 'email',
		isRequired: true,
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