import renderer from 'react-test-renderer';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import {configUiFactory} from "./configUiFactory";

describe( 'configUiFactory',  () => {

	function change(){}
	const fieldsSet = [];
	//A mock library is needed!
	const textFieldConfig = {
		id: 'tags',
		'label': 'Tags',
		'description': 'Comma separated list of tags.',
		'type': 'text',
		'default': false,
		onValueChange: change,
	};

	const defaultSequenceId = 42;
	const hiddenFieldConfig = {
		'id': 'seq',
		'type': 'hidden',
		'label': 'Sequence ID',
		'default': defaultSequenceId,

		onValueChange: change,
	};

	const fields = {
		tags: textFieldConfig,
		sequenceId: hiddenFieldConfig
	};

	Object.values( fields ).map( field =>{
		fieldsSet.push(field)
	});

	it( 'matches the snapshot', () =>{
		const component = renderer.create(
			<div className={'test-group'}>
				{Array.from(configUiFactory(fields)).map((field,i) => {
					return React.createElement(
						'div', {
							key: i,
							className: `f-${i}`
						},
						field
					);
				})}
			</div>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	});


	it( 'Renders the right UI', () =>{
		const wrapper = mount(
			<div className={'test-group'}>
				{Array.from(configUiFactory(fields)).map((field,i) => {
					return React.createElement(
						'div', {
							key: i,
							className: `f-${i}`
						},
						field
					);
				})}
			</div>
		);
		expect( wrapper.find('.f-1').children().length ).toEqual(1);
		expect( wrapper.find('.test-group').children().length ).toEqual(2);
	});



});