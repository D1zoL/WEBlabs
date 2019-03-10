import React from 'react';

import Radio from './Radio';

class Type extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: null
		};
	}

	render() {
		return (
			<div>
				<Radio name="type" text="Доставка в магазин" onChange={this.props.onTypeChange}/>
				<Radio name="type" text="Доставка курьером" onChange={this.props.onTypeChange}/>
			</div>
		);
	}
}

export default Type;