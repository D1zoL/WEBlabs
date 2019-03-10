import React from 'react';

import Input from './Input';

class Info extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: null
		};
	}

	render() {
		return (
			<div>
				<Input text="Фамилия Имя Отчество:" onChange={this.props.onNameChange}/>
				<Input text="Номер телефона:" onChange={this.props.onPhoneChange}/>
			</div>
		);
	}
}

export default Info;