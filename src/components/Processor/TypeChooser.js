import React from 'react';
import PropTypes from 'prop-types';

import {processorTypesMap} from "../../factories/processorFactory";

export class TypeChooser extends React.PureComponent {
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

	getProcessorTypes(){
		if( 'function' === typeof this.props.getProcessorTypes){
			return this.props.getProcessorTypes();
		}
		return processorTypesMap;
	}

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
 * Prop definitions for TypeChooser component

 * @type {{onUpdateProcessor: *, ID: *, type: shim, label: shim}}
 */
TypeChooser.propTypes = {
	onUpdateProcessor: PropTypes.func.isRequired,
	ID: PropTypes.string.isRequired,
	type: PropTypes.string,
	label: PropTypes.string,
	getProcessorTypes: PropTypes.func
};

