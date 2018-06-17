import React from 'react';
import PropTypes from 'prop-types';
import {ProcessorContainer} from "../Processor/ProcessorContainer";

/**
 * Displays list of processors
 *
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
export const List = (props) => {
	const processors = Array.from( props.processors.values() );
	return (
		<div>
			{processors.map(processor => {
				return (
					<div
						key={`${processor.ID}`}
					>
						<em>{processor.ID}</em>
						<ProcessorContainer
							form={props.form}
							processor={processor}
							onUpdateProcessor={props.onUpdateProcessor}
							onRemoveProcessor={props.onRemoveProcessor}
						/>
					</div>
				);
			})}
		</div>
	)

};

List.propTypes = {
	form: PropTypes.object.isRequired,
	processors: PropTypes.instanceOf(Map).isRequired,
	onRemoveProcessor: PropTypes.func.isRequired,
	onUpdateProcessor: PropTypes.func.isRequired
};
