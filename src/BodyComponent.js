import React, {Component} from 'react'
import searchIcon from './icon/image.png'
import startIcon from './icon/start.png'
import vector from './icon/Vector.png'
import './Body.css'
import './header.css'
import UserNotFoundComponent from './UserNotFoundComponent'
import UserDataComponent from './UserDataComponent'
import UserRepositories from './UserRepositoriesComponent'

export default class BodyComponent extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			user:{},
			repos: [
			 ]
			
		}
		this.afterSubmission = this.afterSubmission.bind(this);
	}

	searchUser = () =>{
		let username = this.state.username;
		 fetch('https://api.github.com/users/'+ username).then((response) => {
			if(response.status === 200){
				return response.json();
			}
			else{
				return null;
			}
			}).then((data) => { 

				if( data != null){
					this.setState({
						user: data,
						});

				}
				else{this.setState({
					user: null});

				}
			});
				
	}

	



	afterSubmission = (event) => {
    event.preventDefault();
    if(this.state.username !== ""){
    	this.searchUser();
    }
    	this.setState({	username: ''})
    }

    handleChange = (event) => {
    	this.setState({username: event.target.value});
    }
	
	render(){

		let currentPage;
		if(this.state.user == null){
				currentPage = <React.Fragment><UserNotFoundComponent/></React.Fragment>;
		}
		else if(Object.keys(this.state.user).length !== 0 && this.state.user.login !==''){
			currentPage =  <React.Fragment><UserDataComponent user={this.state.user}/><UserRepositories user ={this.state.user} /></React.Fragment>;

		}
		else if(Object.keys(this.state.user).length === 0){
			currentPage = <React.Fragment><img src={startIcon} className="start-icon" alt="start-icon"/></React.Fragment>;
		}

	return (
		
			<React.Fragment>
				<header className="Head">
					<img src={vector} className="Frame" alt="vector"/>
					<div className ="Rectangle">
						<div className="IconTextGroup">
								<img src={searchIcon}   className="Icon" alt="icon"/>
								<form onSubmit={this.afterSubmission}>
									<input className="SearchForm" placeholder="Enter GitHub username"  onChange={this.handleChange}/>
								</form>			 
						</div>
					</div>
				</header>
				<div className="content">
				{currentPage}
				</div>
			</React.Fragment>
		);
	}
}