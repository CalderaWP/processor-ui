import React from 'react';
import PropTypes from 'prop-types';
import {RemoveProcessorButton} from "../Processor/RemoveProcessorButton";
import {Editor} from "../Processor/Editor";
import {OpenEditorButton} from "../Processor/OpenEditorButton";

/**
 * Displays list of processors
 *
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
export class List extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			opened: {}
		};
		this.onUpdateProcessor = this.onUpdateProcessor.bind(this);

	}
	onUpdateProcessor(updatedProcessor){
		let opened = this.state.opened;
		opened[updatedProcessor.ID]=false;
		this.setState({
			opened
		});
		this.props.onUpdateProcessor(updatedProcessor);
	}


	render() {
		const processors = Array.from( this.props.processors.values() );
		return (
			<div>
				{processors.map(processor => {
					let isOpen = this.state.opened.hasOwnProperty(processor.ID) && true === this.state.opened[processor.ID];
					const key = processor.type ? `${processor.type}-${processor.ID}` : processor.ID;
					return (
						<div
							key={key}
						>
							<em>{processor.ID}</em>
							{isOpen &&
								<Editor
									ID={processor.ID}
									type={processor.type}
									configFields={processor.configFields}
									onUpdateProcessor={this.onUpdateProcessor}
									form={this.props.form}
									isOpen={isOpen}
								/>
							}

							<OpenEditorButton
								isOpen={isOpen}
								onClick={() =>{
									let opened = this.state.opened;
									if( ! opened.hasOwnProperty(processor.ID) ){
										opened[processor.ID]=true;
									}else{
										opened[processor.ID] = !opened[processor.ID];
									}

									this.setState({
										opened
									})
								}}
							/>
							<RemoveProcessorButton
								onClick={() => {
									this.props.onRemoveProcessor(processor.ID);
								}}
							/>
						</div>
					);
				})}
			</div>
		)
	}

};

List.propTypes = {
	form: PropTypes.object.isRequired,
	processors: PropTypes.instanceOf(Map).isRequired,
	onRemoveProcessor: PropTypes.func.isRequired,
	onUpdateProcessor: PropTypes.func.isRequired
};
