import React from 'react';
import PropTypes from 'prop-types';
import * as CalderaComponents from '@caldera-labs/components';
import classNames from 'classnames'
export class Editor extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			opacity: 1,
			hovered: false,
		};
		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseLeave = this.mouseLeave.bind(this);
		this.changeType = this.changeType.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.configFields = this.configFields.bind(this);
		this.labelAs = this.labelAs.bind(this);

	}

	/**
	 * Handler for the mouse enter event
	 */
	mouseEnter() {
		this.setState({hovered: true})
	}

	/**
	 * Handler for the mouse leave event
	 */
	mouseLeave() {
		this.setState({hovered: false})
	}

	/**
	 * Prepares config fields for CalderaComponents.RenderGroup
	 *
	 * @return {Array}
	 */
	configFields(){
		if( Array.isArray( this.props.configFields ) ) {
			return this.props.configFields;
		}

		let fields = [];
		if ( 'object' === typeof this.props.configFields ) {
			Object.keys(this.props.configFields).forEach(configFieldId => {
				fields[configFieldId] = this.props.configFields[configFieldId];
				fields[configFieldId].onValueChange = (newValue) => {
					this.handleChange(configFieldId, newValue);
				};
			});
		}
		return fields;
	}

	/**
	 * Updates the processor config fields and dispatches the change handler
	 *
	 * @param {String} configFieldId Id of configuration field to update.
	 * @param {String|Array|Number} newValue The new value
	 */
	handleChange(configFieldId,newValue){
		let configFields = this.props.configFields;
		configFields[configFieldId] = {
			...configFields[configFieldId],
			value:newValue
		};
		this.props.onUpdateProcessor({
			ID: this.props.ID,
			type: this.props.type,
			label: this.props.label,
			configFields
		});
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
			configFields: this.props.configFields
		});
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
		let removeStyle = {
			//opacity: 0.1
			opacity: 1
		};
		if ( this.state.hovered){
			removeStyle.opacity = 1
		}

		const options = [
			{
				label: 'Email',
				value: 'email'
			},
			{
				label: 'Redirect',
				value: 'redirect'
			}

		];
		return (
			<div
				className={ classNames(this.props.className, {
						'processor-has-type' : 'string' === typeof this.props.type,
						'caldera-forms-processor' : true,
						'not-opened': !this.props.isOpen,
						'is-opened': this.props.isOpen
					})
				}
				//onMouseEnter={this.mouseEnter}
				//onMouseLeave={this.mouseLeave}
			>
				<div className={'processor-label'}>{this.labelAs()}</div>
				<div>
					Type: <span className={'processor-type'}>{this.props.type}</span>
				</div>
				<select
					className={'processor-type-chooser'}
					onChange={this.changeType}
					value={this.props.type}
				>
					<option/>
					{options.map(option => {
							return (
								<option
									key={option.value}
									value={option.value}
								>
									{option.label}
								</option>
							);
						}
					)}
				</select>

				{this.props.type &&
					<div
						className={'processor-editor'}
					>
						<CalderaComponents.RenderGroup
							className={'caldera-forms-processor-config'}
							configFields={this.configFields()}
						/>
					</div>
				}

			</div>
		)
	}
}

/**
 * Prop definitions for Editor Property
 * @type {{processor: *, onUpdateProcessor: *, form: *, configFields: shim}}
 */
Editor.propTypes = {
	onUpdateProcessor: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired,
	configFields: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
	]

	),
	isOpen: PropTypes.bool,
	ID: PropTypes.string.isRequired,
	type: PropTypes.string,
	label: PropTypes.string,

};

Editor.defaultProps = {
	isOpen: false,
	configFields: {}
};