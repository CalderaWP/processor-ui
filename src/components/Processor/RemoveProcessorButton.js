import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays button to open or close processor editor
 *
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
export class  RemoveProcessorButton extends React.PureComponent {

	/**
	 * Constructor for RemoveProcessorButton
	 *
	 * @param {object} props
	 */
	constructor(props){
		super(props);
		this.state = {
			message: props.label,
			inConfirm: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	/**
	 * Handle button clicks
	 *
	 * On first click, change to confirm message,
	 * On second click, call onClick prop
	 */
	handleClick(){
		if (false === this.state.inConfirm) {
			this.setState({
				message: this.props.labelToConfirm,
				inConfirm:true
			})
		} else {
			this.props.onClick();
		}
	}

	/**
	 * Render the RemoveProcessorButton componentWithState
	 * @returns {*}
	 */
	render(){
		return (

			<button
				style={this.props.style}
				className={this.props.className}
				onClick={this.handleClick}
			>
				<span>{this.state.message}</span>
			</button>

		)
	}


};

/**
 * Props requirements for RemoveProcessorButton componentWithState
 *
 *
 * @type {{label: shim, labelToConfirm: shim, onClick: *}}
 */
RemoveProcessorButton.propTypes = {
	label: PropTypes.string,
	labelToConfirm: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};

/**
 * Default props for RemoveProcessorButton
 *
 * @type {{labelToOpen: string, labelToConfirm: string}}
 */
RemoveProcessorButton.defaultProps = {
	label: 'Remove Processor',
	labelToConfirm: 'Are you sure?',
};
