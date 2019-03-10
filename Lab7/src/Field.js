import React from 'react';

class Field extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: null
		};
	}
	
	onChange() {
		var value = this.input.value;
		this.props.onChange(value);
	}

	render() {
		return (
			<div>
				<input ref={(ref) => this.input = ref} type="text" onChange={this.onChange.bind(this)}/>
			</div>
		);
	}
}

export default Field;