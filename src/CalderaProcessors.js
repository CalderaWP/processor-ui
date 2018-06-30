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
class CalderaProcessors extends React.PureComponent {
	/**
	 * Render processor UI
	 * @return {*}
	 */
	render() {
		return(
			<div className="caldera-forms-processors">
				<List
					form={this.props.form}
					processors={this.props.processors}
					onUpdateProcessor={this.props.onUpdateProcessor}
					onRemoveProcessor={this.props.onRemoveProcessor}
					getProcessorFromCollection={this.props.getProcessorFromCollection}
					getProcessorTypes={this.props.getProcessorTypes}
				/>
				<NewProcessor
					onNewProcessor={this.props.onNewProcessor}
				/>
			</div>
		);
	}
}

/**
 * Prop definitions for CalderaProcessors component
 * @see https://www.npmjs.com/package/prop-types
 *
 * @type {{processors: (shim|*), form: *, onAddProcessor: *, onNewProcessor: *, onRemoveProcessor: *, onUpdateProcessor: *}}
 */
CalderaProcessors.propTypes = {
	processors: PropTypes.instanceOf(Map).isRequired,
	processorTypes: PropTypes.instanceOf(Map).isRequired,
	form: PropTypes.object,
	onAddProcessor: PropTypes.func.isRequired,
	onNewProcessor: PropTypes.func.isRequired,
	onRemoveProcessor: PropTypes.func.isRequired,
	onUpdateProcessor: PropTypes.func.isRequired,
	onUpdateProcessorType: PropTypes.func.isRequired,
	getProcessorFromCollection: PropTypes.func.isRequired,
	getProcessorTypes: PropTypes.func.isRequired,
};

/**
 * Default props for CalderaProcessors component
 *
 * @type {{processors: Map<any, any>, form: {ID: string, name: string, fields: {fld12: {ID: string, label: string, type: string}, fld22: {ID: string, label: string, type: string}, fld3: {ID: string, label: string, type: string}}}}}
 */
CalderaProcessors.defaultProps = {
	processors: new Map(),
	processorTypes: new Map(),
};

export default CalderaProcessors;