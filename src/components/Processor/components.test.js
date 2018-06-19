import renderer from 'react-test-renderer';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OpenEditorButton} from "./OpenEditorButton";
import {RemoveProcessorButton} from "./RemoveProcessorButton";
import {Editor} from "./Editor";
import {mapKeysToIdProperty, objectToMap} from "../../factories/util";
import {emailDefaultConfigFields} from "../../processors/emailDefaultConfigFields";

import * as CalderaComponents from '@caldera-labs/components';

describe( 'Using RenderGroup', () => {
	it( 'RenderGroup snapshot', () => {
		const component = renderer.create(
			<CalderaComponents.RenderGroup configFields={[
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
					onValueChange: (newValue) =>{
						console.log(newValue)
					}
				}
			]} />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	});

	it( 'RenderGroup adds our wrapper className', () => {
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
					onValueChange: (newValue) =>{
						console.log(newValue)
					}
				}
			]} />
		);
		expect( wrapper.find('.cf-something-config').length ).toBe(1);
	});
});




Enzyme.configure({ adapter: new Adapter() });

describe( 'Processor components', () =>{
	function handler(){};

	describe( 'OpenEditorButton', () => {
		it( 'renders with out the non-required props', () => {
			const component = renderer.create(
				<OpenEditorButton
					isOpen={false}
					onClick={handler}
				/>
			);
			expect( component.toJSON( ) ).toMatchSnapshot();
		});

		it( 'renders with label props', () => {
			const component = renderer.create(
				<OpenEditorButton
					isOpen={false}
					onClick={handler}
					labelToOpen={'Open!'}
					labelToClose={'Close!'}
				/>
			);
			expect( component.toJSON( ) ).toMatchSnapshot();
		});

		it( 'Shows open label when open',  () =>{
			const wrapper = shallow(
				<OpenEditorButton
					isOpen={true}
					onClick={handler}
					labelToOpen={'It is closed'}
					labelToClose={'It is opened'}
				/>
			);
			expect( wrapper.find('button').text()).toEqual( 'It is opened' );
		});

		it( 'Shows closed label when closed',  () =>{
			const wrapper = shallow(
				<OpenEditorButton
					isOpen={false}
					onClick={handler}
					labelToOpen={'It is closed'}
					labelToClose={'It is opened'}
				/>
			);
			expect( wrapper.find('button').text()).toEqual( 'It is closed' );
		});

		it( 'Calls props.onClick when clicked', () => {
			let clicked = false;
			const wrapper = shallow(
				<OpenEditorButton
					onClick={() => {
						clicked = true;
					}}
					isOpen={true}

				/>
			);
			wrapper.find( 'button' ).simulate('click')
			expect( clicked).toEqual( true );
		});
	});

	describe( 'Remove Processor Button', () => {
		it( 'Renders without label props', () => {
			const component = renderer.create(
				<RemoveProcessorButton
					onClick={handler}
				/>
			);
			expect( component.toJSON( ) ).toMatchSnapshot();
		});

		it( 'Renders with label props', () => {
			const component = renderer.create(
				<RemoveProcessorButton
					onClick={handler}
					label={'R2'}
					labelToConfirm={'confirm?'}
				/>
			);
			expect( component.toJSON( ) ).toMatchSnapshot();
		});

		it( 'changes the message when clicked once', () => {
			const wrapper = shallow(
				<RemoveProcessorButton
					onClick={()=>{}}
					label={'R2'}
					labelToConfirm={'Confirm?'}
				/>
			);
			wrapper.find('button').simulate('click');
			expect(wrapper.find('button').text()).toEqual( 'Confirm?');
		});

		it( 'Does not call the onClick when clicked twice', () => {
			let clickRecived = false;
			const wrapper = shallow(
				<RemoveProcessorButton
					onClick={()=>{
						clickRecived = true;
					}}
					label={'R2'}
					labelToConfirm={'Confirm?'}
				/>
			);
			wrapper.find('button').simulate('click');
			expect(clickRecived).toEqual( false );
		});

		it( 'Calls the onClick when clicked twice', () => {
			let clickRecived = false;
			const wrapper = shallow(
				<RemoveProcessorButton
					onClick={()=>{
						clickRecived = true;
					}}
					label={'R2'}
					labelToConfirm={'Confirm?'}
				/>
			);
			wrapper.find('button').simulate('click');
			wrapper.find('button').simulate('click');
			expect(clickRecived).toEqual( true );
		});
	});

	describe( 'Editor', () => {
		const emailProcessor = {
			ID: 'p1',
			label: 'Main Email',
			type: 'email'
		};
		const processors = new Map();
		processors.set( 'p1', emailProcessor );

		const form = {
			ID: 'CF1',
			name: 'Contact',
			field: {
				firstName: {

				},
				lastName: {

				}
			}
		};

		it( 'renders with props', () => {
			const component = renderer.create(
				<Editor
					processor={emailProcessor}
					onUpdateProcessor={handler}
					form={form}
				/>
			);
			expect( component.toJSON( ) ).toMatchSnapshot();
		});

		it( 'Has chooser if no type',  () =>{
			const wrapper = shallow(
				<Editor
					processor={{
						ID: 'p122'
					}}
					onUpdateProcessor={handler}
					form={form}
				/>
			);
			expect( wrapper.find( '.processor-type-chooser').length).toBe(1);
		});

		it( 'Shows type',  () =>{
			const wrapper = shallow(
				<Editor
					processor={{
						ID: 'p122',
						type: 'redirect'
					}}
					onUpdateProcessor={handler}
					form={form}
				/>
			);
			expect( wrapper.find( '.processor-type').length).toBe(1);
			expect( wrapper.find( '.processor-type').text()).toBe('redirect');
		});

		it( 'Updates type',  () =>{
			let type = 'redirect';
			function changeHandler(updateProcessor){

				type = updateProcessor.type;
			}
			const wrapper = shallow(
				<Editor
					processor={{
						ID: 'p122',
					}}
					onUpdateProcessor={changeHandler}
					form={form}
				/>
			);
			expect( wrapper.find( '.processor-type-chooser').length).toBe(1);
			wrapper.find( '.processor-type-chooser' ).simulate('change', {target: { value : 'email'}});
			expect( type).toBe('email');
		});

	});

});