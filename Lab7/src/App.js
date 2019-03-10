import React from 'react';

import Info from './Info';
import Type from './Type';
import Reg from './Reg';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			phone: "",
			type: "",
			text: "Ожидание ввода"
		}
		
		this.number = parseInt(Math.random() * 10000);
	}
	
	onNameChange(name) {
		this.setState({
			name: name
		});
	}
	
	onPhoneChange(phone) {
		this.setState({
			phone: phone
		});
	}
	
	onTypeChange(type) {
		this.setState({
			type: type
		});
	}
	
	getState() {
		return this.state;
	}
	
	setText(text) {
		this.setState({
			text: text
		});
	}
	
	render() {
		return (
			<div className="app">
				<h1>Форма заказа товара<br/>№{this.number}</h1>
				<Info onNameChange={this.onNameChange.bind(this)} onPhoneChange={this.onPhoneChange.bind(this)}/>
				<br/>
				<Type onTypeChange={this.onTypeChange.bind(this)}/>
				<br/>
				<Reg getState={this.getState.bind(this)} setText={this.setText.bind(this)}/>
				<br/>
				{this.state.text}
			</div>
		);
	}
}

export default App;