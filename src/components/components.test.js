import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {List} from './Processors/List';
import {NewProcessor} from './Processors/NewProcessor';

Enzyme.configure({ adapter: new Adapter() });


describe( 'Processor UI components', () => {
	const EmailProcessorId = 'p1';
	const emailProcessor = {
		ID: EmailProcessorId,
		label: 'Main Email',
		type: 'email',
		configFields: {}
	};
	const processors = new Map();
	processors.set( 'p1', emailProcessor );
	const form = {
		ID: 'CF1',
		fields: {

		}
	};

	describe( 'Processors list componentWithState', () => {
		it( 'renders with 1 processor', () => {
			const component = renderer.create(
				<List
					form={form}
					processors={processors}
					onRemoveProcessor={() => {}}
					onUpdateProcessor={() => {}}
					getProcessorFromCollection={() => {}}
				/>
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
				<List
					form={form}
					processors={processors}
					onRemoveProcessor={() => {}}
					onUpdateProcessor={() => {}}
					getProcessorFromCollection={() => {}}
				/>
			);
			expect( component.toJSON( ) ).toMatchSnapshot();
		});

	});

	describe( 'Processor add button', () => {
		describe( 'Renders with default label', () => {
			it( 'matches snapshot', () => {
				const component = renderer.create(
					<NewProcessor onNewProcessor={()=>{}}/>
				);
				expect( component.toJSON( ) ).toMatchSnapshot();
			});

			it( 'Has the default label', () => {
				const wrapper = shallow(
					<NewProcessor onNewProcessor={()=>{}}/>
				);
				expect( wrapper.text( ) ).toEqual( NewProcessor.defaultProps.label );
			});

		});

		describe( 'Renders with  label prop', () => {
			it( 'matches snapshot', () => {
				const component = renderer.create(
					<NewProcessor
						onNewProcessor={()=>{}}
						label={'Hi Roy'}
					/>
				);
				expect( component.toJSON( ) ).toMatchSnapshot();
			});

			it( 'Has the default label', () => {
				const wrapper = shallow(
					<NewProcessor
						onNewProcessor={()=>{}}
						label={'Hi Roy'}
					/>
				);
				expect( wrapper.text( ) ).toEqual( 'Hi Roy' );
			});

		});

	});


});