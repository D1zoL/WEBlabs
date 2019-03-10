import React from 'react';

class Radio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: null
		}
	}
	
	onChange() {
		this.props.onChange(this.props.text);
	}
	
	render() {
		return (
			<div>
				<input type="radio" className="radio" name={this.props.name} onChange={this.onChange.bind(this)}/>{this.props.text}
			</div>
		);
	}
}

export default Radio;