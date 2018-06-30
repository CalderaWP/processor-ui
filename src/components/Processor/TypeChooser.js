import React from 'react';
import PropTypes from 'prop-types';

import {processorTypesMap} from "../../factories/processorFactory";

/**
 * Encapsulates the UI for choosing the type of processor a processor is or will be.
 */
export class TypeChooser extends React.PureComponent {
	/**
	 * Create a new TypeChooser componentWithState
	 *
	 * @param {object} props
	 */
	constructor(props) {
		super(props);
		this.changeType = this.changeType.bind(this);
		this.getProcessorTypes = this.getProcessorTypes.bind(this);


	}

	/**
	 * Dispatch a change in processor type
	 *
	 * @param {*} event
	 */
	changeType(event){
		this.props.onUpdateProcessor({
			ID: this.props.ID,
			label: this.props.label,
			type: event.target.value,
			configFields: {}
		});
	}

	/**
	 * Get the processor type options
	 */
	getProcessorTypes(){
		if( 'function' === typeof this.props.getProcessorTypes){
			return this.props.getProcessorTypes();
		}
		return processorTypesMap;
	}

	/**
	 * Renders the UI for choosing the type of processor a processor is or will be.
	 *
	 * @return {*}
	 */
	render() {

		return (
			<select
				className={'processor-type-chooser'}
				onChange={this.changeType}
				value={this.props.type}
			>
				<option/>
				{Array.from(this.getProcessorTypes()).map(option => {
						return (
							<option
								key={option[1].TYPE}
								value={option[1].TYPE}
							>
								{option[1].LABEL}
							</option>
						);
					}
				)}
			</select>
		)
	}
}

/**
 * Prop definitions for TypeChooser componentWithState

 * @type {{onUpdateProcessor: *, ID: *, type: shim, label: shim}}
 */
TypeChooser.propTypes = {
	onUpdateProcessor: PropTypes.func.isRequired,
	ID: PropTypes.string.isRequired,
	type: PropTypes.string,
	label: PropTypes.string,
	getProcessorTypes: PropTypes.func
};

