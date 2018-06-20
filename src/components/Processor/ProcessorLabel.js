import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

/**
 * Encapsulates displaying the label of a processor
 */
export class ProcessorLabel extends React.PureComponent {
	constructor(props) {
		super(props);
		this.labelAs = this.labelAs.bind(this);
	}
	/**
	 * Find the label to show for a processor
	 * @return {string}
	 */
	labelAs(){
		return this.props.label
			? this.props.label
			: this.props.type
				? `${this.props.type} - ${this.props.ID}`
				: this.props.ID;
	}

	render() {
		return(
			<div
				className={ classNames(this.props.className, {

					})
				}

			>
				<div className={'processor-label'}>{this.labelAs()}</div>
				<div>
					Type: <span className={'processor-type'}>{this.props.type}</span>
				</div>
			</div>
		)
	}
}

/**
 * Prop definitions for ProcessorLabel Property
 * @type {{processor: *, onUpdateProcessor: *, form: *, configFields: shim}}
 *
 * @type {{ID: *, type: shim, label: shim}}
 */
ProcessorLabel.propTypes = {
	ID: PropTypes.string.isRequired,
	type: PropTypes.string,
	label: PropTypes.string,

};

;