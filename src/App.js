import React from 'react';
import PropTypes from 'prop-types';
import {List} from "./components/Processors/List";
import {Add} from "./components/Processors/Add";


/**
 * Main App container
 *
 * @param {Object}props
 * @returns {*}
 * @constructor
 */
class App extends React.Component {
	render() {
		return(
			<div className="App">

			</div>
		);
	}
}

/**
 * Prop definitions for App component
 * @see https://www.npmjs.com/package/prop-types
 * @type {{quote: shim, cite: shim}}
 */
App.propTypes = {
	processors: PropTypes.instanceOf(Map).isRequired,
	form: PropTypes.object.isRequired
};

/**
 * Default props for App component
 * @type {{quote: string, cite: string}}
 */
App.defaultProps = {
	processors: new Map(),
	form: {
		ID: 'cf1',
		name: 'Contact Form',
		fields :{
			fld12: {
				ID: 'fld12',
				label: 'First Name',
				type: 'text'
			},
			fld22: {
				ID: 'fld22',
				label: 'Last Name',
				type: 'text'
			},
			fld3: {
				ID: 'fld3',
				label: 'Email',
				type: 'email'
			}
		}
	}
};

export default App;