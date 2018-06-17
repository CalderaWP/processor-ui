import React from 'react';
import PropTypes from 'prop-types';
import {RemoveProcessorButton} from "./RemoveProcessorButton";
import {OpenEditorButton} from "./OpenEditorButton";
import {Editor} from "./Editor";

export class ProcessorContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			opacity: 1,
			hovered: false,
			isOpened: 'string' !== typeof props.processor.type
		};
		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseLeave = this.mouseLeave.bind(this);
		this.toggleOpen = this.toggleOpen.bind(this);
		this.onRemoveClick = this.onRemoveClick.bind(this);
		this.openButton = this.openButton.bind(this);
		this.onEdit = this.onEdit.bind(this);
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
	 * Toggle if editor is open or not
	 */
	toggleOpen(){
		this.setState({isOpened:! this.state.isOpened });
	}

	/**
	 * Handle the remove processor action
	 */
	onRemoveClick(){
		this.props.onRemoveProcessor(this.props.processor.ID);
	}

	openButton(){
		let style = {
			opacity: 0.25
		};
		if ( this.state.hovered){
			style.opacity = 1
		}
		return(
			<OpenEditorButton
				style={style}
				isOpen={this.state.isOpened}
				onClick={this.toggleOpen}
			/>
		)
	}

	onEdit(newValues){
		this.props.onUpdateProcessor(newValues);
	}

	render() {
		let removeStyle = {
			opacity: 0.1
		};
		if ( this.state.hovered){
			removeStyle.opacity = 1
		}
		const labelAs = this.props.label ? this.props.label : this.props.ID;

		return (
			<div
				className={this.props.className}
				onMouseEnter={this.mouseEnter}
				onMouseLeave={this.mouseLeave}
			>

				<div>{labelAs}</div>
				{this.state.isOpened &&
					<Editor
						processor={this.props.processor}
						onUpdateProcessor={this.onEdit}
						form={this.props.form}
					/>
				}

				<div>
					{this.openButton()}
					<RemoveProcessorButton
						style={removeStyle}
						onClick={this.onRemoveClick}
					/>
				</div>
			</div>
		)
	}
}

ProcessorContainer.propTypes = {
	processor: PropTypes.object.isRequired,
	onRemoveProcessor: PropTypes.func.isRequired,
	onUpdateProcessor: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired
};