# Caldera Processors UI


## Shape Of A Processor

```
{
    ID: String,
    type: String,
    label: String
    prepareConfigFields: Array,
    configValues: Map
}
```

* ID: Alphanumeric ID for config field
    - Example: For the list ID of an email marketting processor's settings: `cf-fancyemails-list-id`
* type: String. The type of processors
    - Examples: `email` or `redirect`
* label: Optional String. A user supplied label unique to the processor.
* prepareConfigFields: Array of config fields as expected by [Caldera Components' `RenderGroup` componentWithState](https://calderalabs.org/caldera-components/manual/components.html#rendergroup)
* configValues: A map of the current field values.

## prepareConfigFields vs configValues
`prepareConfigFields` should represent what has been stored for this processor's settings. It contains the saved value and the processor configuration, since configuration is itself dynamic. For example, your options for list to subscribe to may change after the value of a separate field for entering an API key has changed.

Because the `configFieldsFactory` can add in missing values from prepareConfigFields, it makes sense to remove non-standard values from these objects before persisting them.

`configValues` is a `Map`, indexed by `configField.ID` with the current value of the field. Seperating these values out from `configValues`


## Example
```js
import React, {Component} from 'react';
import './App.css';
import CalderaProcessorsUI from '@caldera-labs/processor-ui';
import {Provider} from 'react-redux';

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			store: CalderaProcessorsUI.processorsStore
		}
	}
	componentDidMount() {
		//Add processors from remote API or local json or hard code like in this example
		//dispatch() is documented at https://www.npmjs.com/package/@wordpress/data#dispatch-storename-string--object
		this.state.store.dispatch(
			//setProcessorType() is documented at https://calderalabs.org/processor-ui/function/index.html#static-function-setProcessorType
			CalderaProcessorsUI.actions.setProcessorType(
				//processorType definition
				{
				    TYPE: 'superProcessor', //identifier for processor
				    LABEL: 'Super ', //Human readable label for processor
				    defaultConfigFields: [] //configuration fields. https://calderalabs.org/caldera-components/manual/factories.html#configfield-schema 
			    	},
			    	'superProcessor' //identifier for processor
			)
		);

	}

	render() {
		return (
			<div className="caldera-forms-processors">
				<Provider store={this.state.store}>
					<CalderaProcessorsUI.CalderaProcessorsWithState/>
				</Provider>

			</div>
		);
	}
}
```