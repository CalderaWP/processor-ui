import React from 'react';
import ReactDOM from 'react-dom';
import CalderaProcessorsWithState from './CalderaProcessorsWithState';
import { Provider } from 'react-redux';
import {processorsStore} from './state/processorsStore';
import {validationSubscriber} from "./state/validationSubscriber";

/**
 * Manages a single instance of the Caldera Processor UI with state and validation.
 *
 * @param {String} elementId ID of element UI gets mounted on.
 *
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

	/**
	 * Add subscriber to store used for validation
	 * @return {boolean}
	 */
	this.subscribeForValidation = () => {
		validationSubscriptionUnsubscribe = processorsStore.subscribe(validationSubscriber);
		return 'function' === typeof validationSubscriptionUnsubscribe
			? true
			: false;

	};

	/**
	 * Unsubscribe the validation subscriber
	 *
	 * @return {boolean}
	 */
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
		);
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
	};

}


