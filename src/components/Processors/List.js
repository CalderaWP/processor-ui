import React from 'react';
import PropTypes from 'prop-types';
import {RemoveProcessorButton} from "../Processor/RemoveProcessorButton";
import {Editor} from "../Processor/Editor";
import {OpenEditorButton} from "../Processor/OpenEditorButton";
import {TypeChooser} from "../Processor/TypeChooser";
import {ProcessorLabel} from "../Processor/ProcessorLabel";
import {
	checkConfigFieldsConditionals,
	mapKeysToIdProperty,
	objectToMap,
	reduceConfigFieldsToValues
} from "../../factories/util";

const findFieldValues = (processor) => {
	return reduceConfigFieldsToValues(
		mapKeysToIdProperty(
			objectToMap(
				processor.configFields
			)
		)
	);

}
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
			opened: {},
			processorFieldValues: new Map(),
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
			opened,
		});

		if( this.state.processorFieldValues.has( updatedProcessor.ID)){
			let previousValues = this.state.processorFieldValues.get( updatedProcessor.ID );
			const conditionalChecks = checkConfigFieldsConditionals(
				updatedProcessor.configFields,
				this.state.processorFieldValues.get( updatedProcessor.ID )
			);
			Object.keys( updatedProcessor.configFields ).forEach(configFieldId =>{
				if( ! conditionalChecks[configFieldId]){
					updatedProcessor.configFields[configFieldId].value = previousValues[configFieldId];
				}
			});
		}

		this.setState({
			processorFieldValues: this.state.processorFieldValues.set(
				updatedProcessor.ID,
				findFieldValues(updatedProcessor)
			)
		});

	}

	/**
	 * Create editor for one processor
	 *
	 * Adds the conditional logic to the Editor component
	 *
	 * @param {Object} processor
	 * @param {Boolean} isOpen
	 * @return {*}
	 */
	editor(processor,isOpen){
		if( 'object' === typeof  processor
			&& this.props.processors.has(processor.ID ) ){
			const conditionalChecks = checkConfigFieldsConditionals(
				processor.configFields,
				this.state.processorFieldValues.get( processor.ID )
			);
			let configFields = {};
			Object.keys( processor.configFields ).forEach(configFieldId =>{
				if( conditionalChecks[configFieldId]){
					configFields[configFieldId]= processor.configFields[configFieldId];
				}
			});

			return(
				<Editor
					ID={processor.ID}
					type={processor.type}
					label={processor.label}
					configFields={configFields}
					onUpdateProcessor={this.onUpdateProcessor}
					form={this.props.form}
					isOpen={isOpen}
					getProcessorFromCollection={this.props.getProcessorFromCollection}
				/>
			)
		}

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
								<React.Fragment>{this.editor(processor,isOpen)}</React.Fragment>
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
