import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button to add new processor with
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
export  const NewProcessor = (props) => {
	function handler(event){
		props.onNewProcessor(event.target.value);
	}

	return(
		<div>
			<button
				onClick={handler}
			>
				{props.label}
			</button>
		</div>
	)
};

NewProcessor.propTypes = {
	onNewProcessor: PropTypes.func.isRequired,
	label: PropTypes.string
};

NewProcessor.defaultProps = {
	label: 'NewProcessor Processor'
};