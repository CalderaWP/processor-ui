import renderer from 'react-test-renderer';
import React from 'react';
import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Editor} from "./Editor";
import {TypeChooser} from "./TypeChooser";
import {processorFactory} from "../../factories/processorFactory";
import emailProcessorType from "../../processors/emailProcessorType";
import redirectProcessorType from "../../processors/redirectProcessorType";
import {ProcessorLabel} from "./ProcessorLabel";


Enzyme.configure({adapter: new Adapter()});

function handler() {
};

describe('Editor componentWithState', () => {
	const emailProcessor = processorFactory('p1', emailProcessorType.TYPE, {});
	const processors = new Map();
	processors.set('p1', emailProcessor);

	const form = {
		ID: 'CF1',
		name: 'Contact',
		field: {
			firstName: {},
			lastName: {}
		}
	};

	it('Renders with props', () => {
		const component = renderer.create(
			<Editor
				ID={emailProcessor.ID}
				configFields={emailProcessor.configFields}
				type={emailProcessor.type}
				onUpdateProcessor={() => {
				}}
				getProcessorFromCollection={() => {
				}}
				form={form}
			/>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('Processor Label', () => {
		it('It set the label in the .processor-label div by ID if that is all it has', () => {
			const wrapper = shallow(
				<Editor
					ID={'p22'}
					configFields={{}}
					onUpdateProcessor={() => {
					}}
					getProcessorFromCollection={() => {
					}}
					form={form}
				/>
			);
			expect(wrapper.find('.processor-label').text()).toBe('p22');
		});

		it('It  labels by ID if that is all it has', () => {
			const component = new ProcessorLabel({

				ID: 'p23',

				configFields: {},
				form: form,
				onUpdateProcessor: () => {
				}
			});
			expect(component.labelAs()).toBe('p23');
		});

		it('If no label in .processor-label see type - ID ', () => {
			const wrapper = shallow(
				<Editor
					ID={'p28'}
					type={'email'}
					configFields={{}}
					onUpdateProcessor={() => {
					}}
					getProcessorFromCollection={() => {
					}}
					form={form}
				/>
			);
			expect(wrapper.find('.processor-label').text()).toBe('email - p28');
		});

		it('It  labels by type - ID if has type, but no label', () => {
			const component = new ProcessorLabel({
				ID: 'p29',
				type: 'email',
				configFields: {},
				form: form,
				onUpdateProcessor: () => {
				}
			});
			expect(component.labelAs()).toBe('email - p29');
		});

		it('If it has label shows it in .processor-label element ', () => {
			const wrapper = shallow(
				<Editor
					ID={'p30'}
					type={'email'}
					label={'Email To Roy'}
					configFields={{}}
					onUpdateProcessor={() => {
					}}
					form={form}
					getProcessorFromCollection={() => {
					}}
				/>
			);
			expect(wrapper.find('.processor-label').text()).toBe('Email To Roy');
		});

		describe('Methods of Editor componentWithState', () => {
			it('mouseEnter updates state', () => {
				const wrapper = shallow(
					<Editor
						ID={'configFields-1'}
						type={'email'}
						label={'Email To Roy'}
						configFields={{}}
						onUpdateProcessor={() => {
						}}
						form={form}
						getProcessorFromCollection={() => {
						}}
					/>
				);
				wrapper.instance().mouseEnter();
				expect(wrapper.state().hovered).toEqual(true);
			});
			it('mouseLeave updates state', () => {
				const wrapper = shallow(
					<Editor
						ID={'configFields-1'}
						type={'email'}
						label={'Email To Roy'}
						configFields={{}}
						onUpdateProcessor={() => {
						}}
						form={form}
						getProcessorFromCollection={() => {
						}}
					/>
				);
				wrapper.instance().mouseLeave();
				expect(wrapper.state().hovered).toEqual(false);
			});
			it('preparing config fields in editor returns empty array if  config fields empty', () => {
				const wrapper = shallow(
					<Editor
						ID={'configFields-1'}
						type={'email'}
						label={'Email To Roy'}
						configFields={{}}
						onUpdateProcessor={() => {
						}}
						form={form}
						getProcessorFromCollection={() => {
						}}
					/>
				);
				expect(wrapper.instance().configFields()).toEqual([]);
			});
			const configFields = {
				fromName: {
					label: 'From Name',
					desc: 'Who the email is from',
					type: 'input',
					default: 'Roy Sivan',
					id: 'fromName',
					ID: 'fromName',
					onValueChange: () => {
					},
					inputType: 'text',
					help: 'Who the email is from',
					value: 'Roy',
					conditionals: () => {
						return true;
					}
				},
				fromEmail:
					{
						label: 'From Email',
						desc: 'Who the email is from',
						type: 'input',
						id: 'fromEmail',
						ID: 'fromEmail',
						onValueChange: () => {
						},
						inputType: 'email',
						help: 'Who the email is from',
						value: 'roy@hiroy.club',
						conditionals: () => {
							return true;
						}

					}
			};

			it('Editor componentWithState finds field values', () => {
				const wrapper = shallow(
					<Editor
						ID={'configFields-2'}
						type={'email'}
						label={'Email To Roy'}
						configFields={configFields}
						onUpdateProcessor={() => {
						}}
						form={form}
						getProcessorFromCollection={() => {
						}}
					/>
				);
				expect(wrapper.instance().findFieldValues()).toEqual(
					{
						"fromEmail": "roy@hiroy.club",
						"fromName": "Roy"
					}
				);
			});

			it('preparing config fields returns array of config fields unmodifed if configFields prop is an array', () => {
				const totallyInvalidConfigFields = [
					'pants',
					{
						roy: true,
						mike: true,
					}
				];
				const wrapper = shallow(
					<Editor
						ID={'configFields-2'}
						type={'email'}
						label={'Email To Roy'}
						configFields={totallyInvalidConfigFields}
						onUpdateProcessor={() => {
						}}
						form={form}
						getProcessorFromCollection={() => {
						}}
					/>
				);
				expect(wrapper.instance().configFields()).toEqual(totallyInvalidConfigFields);
			});

			it.skip('preparing config fields in editor returns proper array if config fields not empty', () => {
				const wrapper = shallow(
					<Editor
						ID={'configFields-2'}
						type={'email'}
						label={'Email To Roy'}
						configFields={{}}
						onUpdateProcessor={() => {
						}}
						form={form}
						getProcessorFromCollection={() => {
						}}
					/>
				);
				expect(wrapper.instance().configFields()).toEqual(Object.keys(configFields));
			});
		});

	});

	it('renders with props', () => {
		const component = renderer.create(
			<Editor
				ID={emailProcessor.ID}
				configFields={emailProcessor.configFields}
				type={emailProcessor.type}
				onUpdateProcessor={handler}
				form={form}
				getProcessorFromCollection={() => {
				}}
			/>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('Shows type', () => {
		const wrapper = shallow(
			<Editor
				ID={emailProcessor.ID}
				configFields={emailProcessor.configFields}
				type={emailProcessor.type}
				form={form}
				onUpdateProcessor={handler}
				getProcessorFromCollection={() => {
				}}
			/>
		);
		expect(wrapper.find('.processor-type').length).toBe(1);
	});

	it('Shows the right type', () => {
		const wrapper = shallow(
			<Editor
				ID={'p122'}
				configFields={{}}
				type={redirectProcessorType.TYPE}
				form={form}
				onUpdateProcessor={handler}
				getProcessorFromCollection={() => {
				}}
			/>
		);
		expect(wrapper.find('.processor-type').text()).toBe(redirectProcessorType.TYPE);
	});


	it('Outputs the prepareConfigFields', () => {

		function changeHandler(updateProcessor) {

		}

		const wrapper = shallow(
			<Editor
				ID={'p129'}
				configFields={processorFactory('p129', redirectProcessorType.TYPE).configFields}
				type={redirectProcessorType.TYPE}
				form={form}
				onUpdateProcessor={changeHandler}
				getProcessorFromCollection={() => {
				}}
			/>
		);
		expect(wrapper.find('.processor-editor').children().length).toBe(1);
	});

});

describe('TypeChooser', () => {
	it('Renders props', () => {
		const component = renderer.create(
			<TypeChooser
				onUpdateProcessor={() => {
				}}
				ID={'p12345'}
				type={null}
			/>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('Has the right one selected', () => {
		const wrapper = mount(
			<TypeChooser
				onUpdateProcessor={() => {
				}}
				ID={'p12345'}
				type={emailProcessorType.TYPE}
			/>
		);
		expect(wrapper.prop('type')).toEqual(emailProcessorType.TYPE);

	});

	it('Updates type prop', () => {
		let type = emailProcessorType.TYPE;
		const wrapper = mount(
			<TypeChooser
				onUpdateProcessor={(update) => {
					type = update.type;
				}}
				ID={'p12345'}
				type={emailProcessorType.TYPE}
			/>
		);
		wrapper.find('select').simulate('change', {target: {value: redirectProcessorType.TYPE}})
		expect(type).toEqual(redirectProcessorType.TYPE);

	});

	it('Can get processorTypes', () => {
		const processors = new Map()
			.set('p1', {
				TYPE: 'p1',
				LABEL: 'P1'
			})
			.set('p2', {
				TYPE: 'p2',
				LABEL: 'P2'
			})
			.set('p3', {
				TYPE: 'p3',
				LABEL: 'P3'
			});
		const wrapper = mount(
			<TypeChooser
				onUpdateProcessor={() => {
				}}
				ID={'p12345'}
				type={emailProcessorType.TYPE}
				getProcessorTypes={() => {
					return processors;
				}}
			/>
		);
		expect(wrapper.find('select option').length).toEqual(processors.size + 1);

	});
});

