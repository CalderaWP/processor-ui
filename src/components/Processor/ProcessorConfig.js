import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays button to open or close processor editor
 *
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
export const ProcessorConfig = (props) => {

	return(
		<div
			className={props.className}
		>
			{Array.from( props.configFields.values() ).map( (field,i)=> {


			})}
		</div>
	)


};


/**
 * Props requirements for ProcessorConfig component
 *
 */
ProcessorConfig.propTypes = {
	configFields: PropTypes.object.isRequired,
	onUpdate: PropTypes.func.isRequired,
};

/**
 * Default props for ProcessorConfig
 *
 */
ProcessorConfig.defaultProps = {
	configFieldsDefaults: {},
	configValues: new Map(),
};
