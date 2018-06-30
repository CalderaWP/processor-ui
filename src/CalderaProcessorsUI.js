import React from 'react';
import ReactDOM from 'react-dom';
import CalderaProcessorsWithState from './CalderaProcessorsWithState';
import { Provider } from 'react-redux';
import {processorsStore} from './state/processorsStore';
import {validationSubscriber} from "./state/validationSubscriber";

/**
 *
 * @param elementId
 * @constructor
 */
export default function CalderaProcessorsUI(elementId){
	let validationSubscriptionUnsubscribe = null;
	/**
	 * Get the processor store
	 *
	 * @return {Object}
	 */
	this.getProcessorStore =() => {
		return processorsStore;
	};

	this.subscribeForValidation = () => {
		validationSubscriptionUnsubscribe = processorsStore.subscribe(validationSubscriber);
		if( 'function' === typeof  validationSubscriptionUnsubscribe ){
			return true;
		}
		return false;
	};

	this.unSubscribeToProcessorValidation = () => {
		if( 'function' === typeof  validationSubscriptionUnsubscribe ){
			validationSubscriptionUnsubscribe();
			validationSubscriptionUnsubscribe = null;
			return true;
		}
		return false;
	};

	/**
	 * Creates the processors componentWithState with state setup properly
	 * @return {*}
	 */
	this.componentWithState = () => {
		return(
			<Provider store={processorsStore}>
				<CalderaProcessorsWithState />
			</Provider>
		)
	};

	/**
	 * Mounts the component, with state, on the element whose ID was passed in constructor
	 */
	this.mountOnDOM = () => {
		this.subscribeForValidation();
		ReactDOM.render(
			this.componentWithState(),
			document.getElementById(elementId)
		);
	}

}


