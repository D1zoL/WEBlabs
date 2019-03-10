import React from 'react';

import Field from './Field';

class Input extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: null
		};
	}

	render() {
		return (
			<div>
				{this.props.text}
				<Field onChange={this.props.onChange}/>
			</div>
		);
	}
}

export default Input;