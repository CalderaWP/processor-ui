import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button to add new processor with
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
export  const Add = (props) => {
	function handler(event){
		props.onAdd(event.target.value);
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

Add.propTypes = {
	onAdd: PropTypes.func.isRequired,
	label: PropTypes.string
};

Add.defaultProps = {
	label: 'Add Processor'
};