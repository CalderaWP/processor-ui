import renderer from 'react-test-renderer';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {List} from "./Processors/List";
import {Add} from "./Processors/Add";

Enzyme.configure({ adapter: new Adapter() });


describe( 'Processor UI components', () => {
	const emailProcessor = {
		ID: 'p1',
		label: 'Main Email',
		type: 'email'
	};
	const processors = new Map();
	processors.set( 'p1', emailProcessor );

	describe( 'Processors list component', () => {
		it( 'renders with 1 processor', () => {
			const component = renderer.create(
				<List processors={processors}/>
			);
			expect( component.toJSON( ) ).toMatchSnapshot();
		});

		it( 'renders with 2 processors', () => {
			const twoProcessors = new Map();
			twoProcessors.set( 'p1', emailProcessor );
			twoProcessors.set( 'p2', {
				ID: 'p21',
				label: 'Secondary Email',
				type: 'email'
			} );

			const component = renderer.create(
				<List processors={processors}/>
			);
			expect( component.toJSON( ) ).toMatchSnapshot();
		});
	});

	describe( 'Processor add button', () => {
		describe( 'Renders with default label', () => {
			it( 'matches snapshot', () => {
				const component = renderer.create(
					<Add onAdd={()=>{}}/>
				);
				expect( component.toJSON( ) ).toMatchSnapshot();
			});

			it( 'Has the default label', () => {
				const wrapper = shallow(
					<Add onAdd={()=>{}}/>
				);
				expect( wrapper.text( ) ).toEqual( Add.defaultProps.label );
			});

		});

		describe( 'Renders with  label prop', () => {
			it( 'matches snapshot', () => {
				const component = renderer.create(
					<Add
						onAdd={()=>{}}
						label={'Hi Roy'}
					/>
				);
				expect( component.toJSON( ) ).toMatchSnapshot();
			});

			it( 'Has the default label', () => {
				const wrapper = shallow(
					<Add
						onAdd={()=>{}}
						label={'Hi Roy'}
					/>
				);
				expect( wrapper.text( ) ).toEqual( 'Hi Roy' );
			});

		});

	});


});