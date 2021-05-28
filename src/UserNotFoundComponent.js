import React, {Component} from 'react'
import notFound from './icon/not_found_icon.png'
import './Body.css'

export default class UserNotFoundComponent extends Component {
	constructor(){
		super();
	}
	
	render(){

	return (<React.Fragment>
					<img src={notFound} className = "not-found-icon"/>
			</React.Fragment>
		);
	}
}