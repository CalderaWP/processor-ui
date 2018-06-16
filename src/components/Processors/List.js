import React from 'react';
import PropTypes from 'prop-types';

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
						key={`${processor.ID}${processor.type}`}
					>
						<p>{processor.ID}</p>
						<p>{processor.label}</p>
						<p>{processor.type}</p>
					</div>
				);
			})}
		</div>
	)

};

List.propTypes = {
	processors: PropTypes.instanceOf(Map).isRequired
};
