import React from 'react';
import PropTypes from 'prop-types';
import {List} from "./components/Processors/List";
import {NewProcessor} from "./components/Processors/NewProcessor";

/**
 * Encapsulates the entire processor UI
 *
 * @param {Object}props
 * @returns {*}
 * @constructor
 */
class App extends React.PureComponent {
	render() {
		return(
			<div className="caldera-forms-processors">
				<List
					form={this.props.form}
					processors={this.props.processors}
					onUpdateProcessor={this.props.onUpdateProcessor}
					onRemoveProcessor={this.props.onRemoveProcessor}
				/>
				<NewProcessor
					onNewProcessor={this.props.onNewProcessor}
				/>
			</div>
		);
	}
}

/**
 * Prop definitions for App component
 * @see https://www.npmjs.com/package/prop-types
 *
 * @type {{processors: (shim|*), form: *, onAddProcessor: *, onNewProcessor: *, onRemoveProcessor: *, onUpdateProcessor: *}}
 */
App.propTypes = {
	processors: PropTypes.instanceOf(Map).isRequired,
	form: PropTypes.object.isRequired,
	onAddProcessor: PropTypes.func.isRequired,
	onNewProcessor: PropTypes.func.isRequired,
	onRemoveProcessor: PropTypes.func.isRequired,
	onUpdateProcessor: PropTypes.func.isRequired
};

/**
 * Default props for App component
 *
 * @type {{processors: Map<any, any>, form: {ID: string, name: string, fields: {fld12: {ID: string, label: string, type: string}, fld22: {ID: string, label: string, type: string}, fld3: {ID: string, label: string, type: string}}}}}
 */
App.defaultProps = {
	processors: new Map(),
	form: {
		ID: 'cf1',
		name: 'Contact Form',
		fields :{
			fld12: {
				ID: 'fld12',
				label: 'First Name',
				type: 'text'
			},
			fld22: {
				ID: 'fld22',
				label: 'Last Name',
				type: 'text'
			},
			fld3: {
				ID: 'fld3',
				label: 'Email',
				type: 'email'
			}
		}
	}
};

export default App;