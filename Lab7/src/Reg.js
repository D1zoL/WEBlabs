import React from 'react';

import Button from './Button';

class Reg extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: null
		};
	}
	
	click() {
		var state = this.props.getState();
		
		var text = "";
		
		if (state.name.length == 0)
			text = "Введите ФИО!";
		else if(state.phone.length == 0)
			text = "Введите номер!";
		else if(state.type.length == 0)
			text = "Выберите способ доставки!";
		else
			text = "Ваша заявка отправлена";
		
		this.props.setText(text);
	}

	render() {
		return (
			<div>
				<Button text="Отправить запрос" click={this.click.bind(this)}/>
			</div>
		);
	}
}

export default Reg;