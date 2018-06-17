import {shallow} from "enzyme/build/index";
import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ProcessorContainer} from "./ProcessorContainer";
Enzyme.configure({ adapter: new Adapter() });
describe( 'Processor Container component', () => {
	function handler(){

	}
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

	it( 'Passes snapshot test', () => {
		const component = renderer.create(
			<ProcessorContainer
				processor={{
					ID: 'p122',
				}}
				onUpdateProcessor={handler}
				onRemoveProcessor={handler}
				form={form}
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	});
	it( 'Open if no type',  () =>{

		const wrapper = shallow(
			<ProcessorContainer
				processor={{
					ID: 'p122',
				}}
				onUpdateProcessor={handler}
				onRemoveProcessor={handler}
				form={form}
			/>
		);
		expect( wrapper.state('isOpened') ).toBe(true);
	});

	it( 'Not open if has type',  () =>{
		const wrapper = shallow(
			<ProcessorContainer
				processor={{
					ID: 'p122',
					type: 'redirect'
				}}
				onUpdateProcessor={handler}
				onRemoveProcessor={handler}
				form={form}
			/>
		);
		expect( wrapper.state('isOpened') ).toBe(false);
	});
});
