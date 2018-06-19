import React from 'react';
import PropTypes from 'prop-types';
import * as CalderaComponents from '@caldera-labs/components';

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
		if( Array.isArray( this.props.processor.configFields ) ) {
			return this.props.processor.configFields;
		}

		let fields = [];
		if ( 'object' === typeof this.props.processor.configFields ) {
			Object.keys(this.props.processor.configFields).forEach(configFieldId => {
				fields[configFieldId] = this.props.processor.configFields[configFieldId];
				fields[configFieldId].onValueChange = (newValue) => {
					this.handleChange(configFieldId, newValue);
				};
			});
		}
		return fields;
	}

	handleChange(configFieldId,newValue){
		let configFields = this.props.processor.configFields;
		configFields[configFieldId] = {
			...configFields[configFieldId],
			value:newValue
		};
		this.props.onUpdateProcessor({
			...this.props.processor,
			configFields
		});
	}

	changeType(event){
		this.props.onUpdateProcessor({
			...this.props.processor,
			type: event.target.value
		});
	}


	render() {
		let removeStyle = {
			//opacity: 0.1
			opacity: 1
		};
		if ( this.state.hovered){
			removeStyle.opacity = 1
		}
		const labelAs = this.props.label ? this.props.label : this.props.ID;
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
				className={this.props.className}
				//onMouseEnter={this.mouseEnter}
				//onMouseLeave={this.mouseLeave}
			>
				<div>{labelAs}</div>
				<div>
					Type: <span className={'processor-type'}>{this.props.processor.type}</span>
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

				{this.props.processor.type &&
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

Editor.propTypes = {
	processor: PropTypes.object.isRequired,
	onUpdateProcessor: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired,
	configFields: PropTypes.array
};