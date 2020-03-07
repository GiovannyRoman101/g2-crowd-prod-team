import React, {Component} from 'react'
import axios from 'axios'
import MemberDetail from './member_details'
import firebase from 'firebase'

// TODO: add firebase to save result cannot access on browser

const url = 'https://coding-assignment.g2crowd.com/'


class TeamList extends Component{
	constructor(){
		super()
		this.state = {team_members:[],
			voting: new Map()
		}
	}
	UNSAFE_componentWillMount(){
		axios.get(url).then((response) =>{
			this.setState({team_members: response.data})
			this.getVotes()
		})
		const {team_members, voting} = this.state
			team_members.forEach((team_member) =>{
				if(voting.get(team_member.name)=== undefined){
					voting.set(team_member.name,0)
				}
			})
			this.setState({...this.state, voting:voting})
	}
	updateVotes(){
		for(let currVote of this.state.voting){
			firebase.database().ref('/votes/'+ currVote[0]).set({val:currVote[1]})
		}
	}

	getVotes(){
		const {team_members,voting} = this.state
		for(let i =0; i < team_members.length; i++){
			firebase.database().ref('/votes/'+ team_members[i].name).on('value',(snapshot) =>{
				voting.set(team_members[i].name,snapshot.val().val)
			})
		}
		this.setState({...this.state, voting:voting})
	}

	onClick(team_member){
		const {voting} = this.state
		voting.set(team_member.name, voting.get(team_member.name)+1 )
		this.setState({...this.state, voting: voting})
		this.updateVotes()
	}


	async componentDidMount(){
		try{
			setInterval(async ()=>{
				axios.get(url).then((response) =>{
					this.getVotes()
					this.setState({...this.state,team_members: response.data})
					const {team_members, voting} = this.state
					team_members.forEach((team_member) =>{
						if(voting.get(team_member.name)=== undefined){
							voting.set(team_member.name,0)
						}
					})
					this.setState({...this.state, voting:voting})
				})
			},1000)
		}catch(e){
			console.log(e)
		}
	}

	renderTeamMembers(){
		
		return this.state.team_members.map((team_member, index)=>{
			return (<MemberDetail key = {index} team_member ={team_member} vote = {this.state.voting.get(team_member.name)} onClick = {this.onClick.bind(this,team_member)}></MemberDetail>)
		})
	}

	render(){
		if(this.state.voting.size ===0){
			return (<span>Loading ...</span>)
		}else{
			return (<div>{this.renderTeamMembers()}</div>)
		}
	}
}

export default TeamList