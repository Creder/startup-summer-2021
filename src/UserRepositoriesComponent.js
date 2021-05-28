import React, {Component} from 'react'
import emptyRepo from './icon/empty_repository.png'
import './Body.css'
import ReactPaginate from 'react-paginate';

export default class UserRepositoriesComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			pageCount: 0,
      		offset: 0,
      		repos: [],
     		data: [],
     		perPage: 5,
      		currentPage: 0
		};
		 this.handlePageClick = this
            .handlePageClick
            .bind(this);
	}

	listRepos = () => {
		const slice = this.state.repos.slice(this.state.offset, this.state.offset + this.state.perPage)
		const postData = slice.map(pd =>
                    <div className ="repo-info" >
						<a href="#" onClick={() => window.open(pd.html_url, '_blank')} className="repo-name">{pd.name}</a>
						<p className="repo-description">{pd.description}</p>
					</div> )

		 this.setState({
                 pageCount: Math.ceil(this.state.repos.length / this.state.perPage),
                 data: postData   
                })
	}

	handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.listRepos()
        });

    };

    searchRepos = () =>{
		let username = this.props.user.login;
		fetch('https://api.github.com/users/'+ username+'/repos').then((response) => {
			if(response.status === 200){
				return response.json();
			}
			else{
				return null;
			}
			}).then((data) => { 
				if( data != null){
					this.setState({repos: data})
				}
			});		
	}

	componentDidMount(){
		this.searchRepos()
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.user != this.props.user){
			this.searchRepos()
			this.setState({
				pageCount: 0,
      			offset: 0,
			})
			
		}
		if(prevState.repos != this.state.repos){
			this.listRepos()
		}
	}
	
	render(){

		let repoList;
		if(Object.keys(this.state.data).length != 0){
			repoList = <React.Fragment>
				<p className="repo-title"> Repostiories ({this.state.repos.length})</p>

				{this.state.data}
			<ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
			</React.Fragment>
		}
		else
			repoList = <img src={emptyRepo} className = "empty-repo-icon"/>
		return <div className = "repo-list">
			{repoList}
		</div>
	}
}