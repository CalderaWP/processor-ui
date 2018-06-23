import renderer from 'react-test-renderer';
import React from 'react';
import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OpenEditorButton} from "./OpenEditorButton";
import {RemoveProcessorButton} from "./RemoveProcessorButton";
import {Editor} from "./Editor";
import {TypeChooser} from "./TypeChooser";


import * as CalderaComponents from '@caldera-labs/components';
import {processorFactory} from "../../factories/processorFactory";
import emailProcessorType from "../../processors/emailProcessorType";
import redirectProcessorType from "../../processors/redirectProcessorType";
import {ProcessorLabel} from "./ProcessorLabel";

describe('Using RenderGroup', () => {
	it('RenderGroup snapshot', () => {
		const component = renderer.create(
			<CalderaComponents.RenderGroup
				configFields={[
					{
						'id': 'cf-something-select-id',
						'type': 'dropdown',
						'label': 'Content type',
						'description': 'Choose content type, default is HTML',
						options: [
							{
								label: 'HTML',
								value: 'html'
							},
							{
								label: 'Plain Text',
								value: 'plain'
							}
						],
						value: 'html',
						onValueChange: (newValue) => {
							console.log(newValue)
						}
					}
				]}
			/>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('RenderGroup adds our wrapper className', () => {
		const wrapper = shallow(
			<CalderaComponents.RenderGroup
				className={'cf-something-config'}
				configFields={[
					{
						'id': 'cf-something-select-id',
						'type': 'dropdown',
						'label': 'Content type',
						'description': 'Choose content type, default is HTML',
						options: [
							{
								label: 'HTML',
								value: 'html'
							},
							{
								label: 'Plain Text',
								value: 'plain'
							}
						],
						value: 'html',
						onValueChange: (newValue) => {
							console.log(newValue)
						}
					}
				]}
			/>
		);
		expect(wrapper.find('.cf-something-config').length).toBe(1);
	});
});


Enzyme.configure({adapter: new Adapter()});

describe('Processor components', () => {
	function handler() {
	};

	describe('OpenEditorButton', () => {
		it('renders with out the non-required props', () => {
			const component = renderer.create(
				<OpenEditorButton
					isOpen={false}
					onClick={handler}
				/>
			);
			expect(component.toJSON()).toMatchSnapshot();
		});

		it('renders with label props', () => {
			const component = renderer.create(
				<OpenEditorButton
					isOpen={false}
					onClick={handler}
					labelToOpen={'Open!'}
					labelToClose={'Close!'}
				/>
			);
			expect(component.toJSON()).toMatchSnapshot();
		});

		it('Shows open label when open', () => {
			const wrapper = shallow(
				<OpenEditorButton
					isOpen={true}
					onClick={handler}
					labelToOpen={'It is closed'}
					labelToClose={'It is opened'}
				/>
			);
			expect(wrapper.find('button').text()).toEqual('It is opened');
		});

		it('Shows closed label when closed', () => {
			const wrapper = shallow(
				<OpenEditorButton
					isOpen={false}
					onClick={handler}
					labelToOpen={'It is closed'}
					labelToClose={'It is opened'}
				/>
			);
			expect(wrapper.find('button').text()).toEqual('It is closed');
		});

		it('Calls props.onClick when clicked', () => {
			let clicked = false;
			const wrapper = shallow(
				<OpenEditorButton
					onClick={() => {
						clicked = true;
					}}
					isOpen={true}

				/>
			);
			wrapper.find('button').simulate('click')
			expect(clicked).toEqual(true);
		});
	});

	describe('Remove Processor Button', () => {
		it('Renders without label props', () => {
			const component = renderer.create(
				<RemoveProcessorButton
					onClick={handler}
				/>
			);
			expect(component.toJSON()).toMatchSnapshot();
		});

		it('Renders with label props', () => {
			const component = renderer.create(
				<RemoveProcessorButton
					onClick={handler}
					label={'R2'}
					labelToConfirm={'confirm?'}
				/>
			);
			expect(component.toJSON()).toMatchSnapshot();
		});

		it('changes the message when clicked once', () => {
			const wrapper = shallow(
				<RemoveProcessorButton
					onClick={() => {
					}}
					label={'R2'}
					labelToConfirm={'Confirm?'}
				/>
			);
			wrapper.find('button').simulate('click');
			expect(wrapper.find('button').text()).toEqual('Confirm?');
		});

		it('Does not call the onClick when clicked twice', () => {
			let clickRecived = false;
			const wrapper = shallow(
				<RemoveProcessorButton
					onClick={() => {
						clickRecived = true;
					}}
					label={'R2'}
					labelToConfirm={'Confirm?'}
				/>
			);
			wrapper.find('button').simulate('click');
			expect(clickRecived).toEqual(false);
		});

		it('Calls the onClick when clicked twice', () => {
			let clickRecived = false;
			const wrapper = shallow(
				<RemoveProcessorButton
					onClick={() => {
						clickRecived = true;
					}}
					label={'R2'}
					labelToConfirm={'Confirm?'}
				/>
			);
			wrapper.find('button').simulate('click');
			wrapper.find('button').simulate('click');
			expect(clickRecived).toEqual(true);
		});
	});

	describe('Editor', () => {
		const emailProcessor = processorFactory( 'p1', emailProcessorType.TYPE, {} );
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

		it( 'Renders with props', () => {
			const component = renderer.create(
				<Editor
					ID={emailProcessor.ID}
					configFields={emailProcessor.configFields}
					type={emailProcessor.type}
					onUpdateProcessor={() => {}}
					getProcessorFromCollection={() => {}}
					form={form}
				/>
			);
			expect( component.toJSON() ).toMatchSnapshot();
		});

		describe( 'Processor Label', () => {
			it( 'It set the label in the .processor-label div by ID if that is all it has', () => {
				const wrapper = shallow(
					<Editor
						ID={'p22'}
						configFields={{}}
						onUpdateProcessor={() => {}}
						getProcessorFromCollection={() => {}}
						form={form}
					/>
				);
				expect( wrapper.find( '.processor-label').text() ).toBe('p22');
			});

			it( 'It  labels by ID if that is all it has', () => {
				const component = new ProcessorLabel({

					ID: 'p23',

					configFields: {},
					form: form,
					onUpdateProcessor: () => {}
				});
				expect( component.labelAs() ).toBe('p23');
			});

			it( 'If no label in .processor-label see type - ID ', () => {
				const wrapper = shallow(
					<Editor
						ID={'p28'}
						type={'email'}
						configFields={{}}
						onUpdateProcessor={() => {}}
						getProcessorFromCollection={() => {}}
						form={form}
					/>
				);
				expect( wrapper.find( '.processor-label').text() ).toBe('email - p28');
			});

			it( 'It  labels by type - ID if has type, but no label', () => {
				const component = new ProcessorLabel({
					ID: 'p29',
					type: 'email',
					configFields: {},
					form: form,
					onUpdateProcessor: () => {}
				});
				expect( component.labelAs() ).toBe('email - p29');
			});

			it( 'If it has label shows it in .processor-label element ', () => {
				const wrapper = shallow(
					<Editor
						ID={'p30'}
						type={'email'}
						label={'Email To Roy'}
						configFields={{}}
						onUpdateProcessor={() => {}}
						form={form}
						getProcessorFromCollection={() => {}}
					/>
				);
				expect( wrapper.find( '.processor-label').text() ).toBe('Email To Roy');
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
					getProcessorFromCollection={() => {}}
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
					getProcessorFromCollection={() => {}}
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
					getProcessorFromCollection={() => {}}
				/>
			);
			expect(wrapper.find('.processor-type').text()).toBe(redirectProcessorType.TYPE);
		});



		it( 'Outputs the prepareConfigFields', () => {

			function changeHandler(updateProcessor) {

			}

			const wrapper = shallow(
				<Editor
					ID={'p129'}
					configFields={processorFactory('p129',redirectProcessorType.TYPE).configFields}
					type={redirectProcessorType.TYPE}
					form={form}
					onUpdateProcessor={changeHandler}
					getProcessorFromCollection={() => {}}
				/>
			);
			expect(wrapper.find('.processor-editor').children().length ).toBe(1);
		});

	});

	describe( 'TypeChooser', () => {
		it( 'Renders props', () => {
			const component = renderer.create(
				<TypeChooser
					onUpdateProcessor={()=>{}}
					ID={'p12345'}
					type={null}
				/>
			);
			expect( component.toJSON() ).toMatchSnapshot();
		});
		
		it ( 'Has the right one selected', () => {
			const wrapper = mount(
				<TypeChooser
					onUpdateProcessor={()=>{}}
					ID={'p12345'}
					type={emailProcessorType.TYPE}
				/>
			);
			expect( wrapper.prop('type') ).toEqual( emailProcessorType.TYPE);
			
		});

		it ( 'Updates type prop', () => {
			let type = emailProcessorType.TYPE;
			const wrapper = mount(
				<TypeChooser
					onUpdateProcessor={(update)=>{
						type = update.type;
					}}
					ID={'p12345'}
					type={emailProcessorType.TYPE}
				/>
			);
			wrapper.find( 'select').simulate( 'change', {target: { value: redirectProcessorType.TYPE }})
			expect(type ).toEqual( redirectProcessorType.TYPE);

		});

		it ( 'Can get processorTypes', () => {
			const processors = new Map()
				.set( 'p1', {
					TYPE: 'p1',
					LABEL: 'P1'
				})
				.set( 'p2', {
					TYPE: 'p2',
					LABEL: 'P2'
				})
				.set( 'p3', {
					TYPE: 'p3',
					LABEL: 'P3'
				});
			const wrapper = mount(
				<TypeChooser
					onUpdateProcessor={()=>{}}
					ID={'p12345'}
					type={emailProcessorType.TYPE}
					getProcessorTypes={() => {
						return processors;
					}}
				/>
			);
			expect(wrapper.find( 'select option').length ).toEqual( processors.size + 1 );

		});
	});

});