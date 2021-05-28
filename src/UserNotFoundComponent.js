import React, {Component} from 'react'
import './Body.css'

export default class UserNotFoundComponent extends Component {
	constructor(){
		super();
	}
	
	render(){

	return (<div className="Body">
					<p>User not found :c</p>
			</div>
		);
	}
}