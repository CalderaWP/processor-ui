import React from 'react';
import PropTypes from 'prop-types';
/**
 * Displays button to open or close processor editor
 *
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
export const OpenEditorButton = (props) => {
	return (

			<button
				style={props.style}
				className={props.className}
				onClick={props.onClick}
			>
				{!props.isOpen &&
					<span>{props.labelToOpen}</span>
				}
				{props.isOpen &&
					<span>{props.labelToClose}</span>
				}
			</button>

	)

};

/**
 * Props requirements for OpenEditorButton componentWithState
 *
 * @type {{isOpen: *, labelToOpen: shim, labelToClose: shim, onClick: *}}
 */
OpenEditorButton.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	labelToOpen: PropTypes.string,
	labelToClose: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};

/**
 * Default props for OpenEditorButton
 *
 * @type {{labelToOpen: string, labelToClose: string}}
 */
OpenEditorButton.defaultProps = {
	labelToOpen: 'Edit Settings',
	labelToClose: 'Close Editor',
};
