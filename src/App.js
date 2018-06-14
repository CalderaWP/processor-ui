import React from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';


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
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Caldera Whatever</h1>
				</header>
				<div>
					<input value={this.props.cite}
						   onChange={(e) =>{this.props.setCount(e.target.value);}}
					/>

					<blockquote>
						<p>
							{this.props.quote}
						</p>
						<cite>- {this.props.cite}</cite>
					</blockquote>
				</div>
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
	quote: PropTypes.string,
	cite: PropTypes.string,
	setCount:PropTypes.func
};

/**
 * Default props for App component
 * @type {{quote: string, cite: string}}
 */
App.defaultProps = {
	quote: 'A self, like a a me in there, that doesn\'t even belong to me, and it wants to come out, it wants me to call it by name. But it\'s - I feel like it\'s waiting for you. To hear it in you, too.',
	cite: 'The OA'
};

export default App;