import React, {Component} from 'react'
import groupIcon from './icon/group.png'
import personIcon from './icon/person.png'
import UserRepositories from './UserRepositoriesComponent'
import './Body.css'
export default class UserDataComponent extends Component {
	constructor(props){
		super(props);
	}
	
	render(){
		let user = this.props.user;
		return (<React.Fragment>	
				<div className="user-info">
							<img src={user.avatar_url} className = "user-image"/>
							<p className="user-name">{user.name}</p>
							<p>{user.login}</p>
							<a href="#" onClick={() => window.open(user.html_url , '_blank')} className="user-login">{user.login}</a>
							<div className="social">
								<div className="group">
									<img src={groupIcon}/>
									<p className="followers">{user.followers} followers</p>
								</div>
								<div className="person">
									<img src={personIcon}/>
									<p className="following">{user.following} following</p>
								</div>
								
								
							</div>
					</div>
					</React.Fragment>	
			);
	}
}