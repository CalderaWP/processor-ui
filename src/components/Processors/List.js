import React from 'react';
import PropTypes from 'prop-types';
import {RemoveProcessorButton} from "../Processor/RemoveProcessorButton";
import {Editor} from "../Processor/Editor";
import {OpenEditorButton} from "../Processor/OpenEditorButton";
import {TypeChooser} from "../Processor/TypeChooser";
import {ProcessorLabel} from "../Processor/ProcessorLabel";

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

	/**
	 * When processors is updated, do stuff
	 *
	 * @todo animations
	 * @param {Object} updatedProcessor The processor config that has been updated
	 */
	onUpdateProcessor(updatedProcessor){
		let opened = this.state.opened;
		opened[updatedProcessor.ID]=false;
		this.setState({
			opened
		});
		this.props.onUpdateProcessor(updatedProcessor);
		opened[updatedProcessor.ID]=true;

		this.setState({
			opened
		});
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
							{isOpen &&
								<Editor
									ID={processor.ID}
									type={processor.type}
									label={processor.label}
									configFields={processor.configFields}
									onUpdateProcessor={this.onUpdateProcessor}
									form={this.props.form}
									isOpen={isOpen}
								/>
							}

							{!isOpen &&
								<ProcessorLabel
									ID={processor.ID}
									label={processor.label}

								/>
							}

							{processor.type &&
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

							}

							{! processor.type &&
								<TypeChooser
									onUpdateProcessor={this.onUpdateProcessor}
									ID={processor.ID}
								/>

							}


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
	form: PropTypes.object,
	processors: PropTypes.instanceOf(Map).isRequired,
	onRemoveProcessor: PropTypes.func.isRequired,
	onUpdateProcessor: PropTypes.func.isRequired,
	getProcessorFromCollection: PropTypes.func.isRequired,
};
