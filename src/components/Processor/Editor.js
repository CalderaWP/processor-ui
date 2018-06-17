import React from 'react';
import PropTypes from 'prop-types';
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

	configFields(){

	}

	handleChange(fieldId,event){

	}

	changeType(event){
		this.props.onUpdateProcessor({
			...this.props.processor,
			type: event.target.value
		})
	}


	render() {
		let removeStyle = {
			opacity: 0.1
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
				onMouseEnter={this.mouseEnter}
				onMouseLeave={this.mouseLeave}
			>
				<div>{labelAs}</div>
				<div>
					Type: <span className={'processor-type'}>{this.props.processor.type}</span>
				</div>
				{ ! this.props.processor.type &&
					<select
						className={'processor-type-chooser'}
						onChange={this.changeType}
						value={this.props.type}
					>
						<option>---</option>
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
				}
				{this.props.processor.type &&
					<p
						className={'processor-editor'}
					>Editor</p>
				}

			</div>
		)
	}
}

Editor.propTypes = {
	processor: PropTypes.object.isRequired,
	onUpdateProcessor: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired
};