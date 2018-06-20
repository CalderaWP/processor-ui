import React from 'react';
import PropTypes from 'prop-types';
import {RemoveProcessorButton} from "../Processor/RemoveProcessorButton";
import {Editor} from "../Processor/Editor";

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
						<Editor
							processor={processor}
							onUpdateProcessor={props.onUpdateProcessor}
							form={props.form}
						/>
						<RemoveProcessorButton
							onClick={() => {
								props.onRemoveProcessor(processor.ID);
							}}
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
