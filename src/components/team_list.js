import React, {Component} from 'react'
import axios from 'axios'
import MemberDetail from './member_details'
import firebase from 'firebase'

const url = 'https://coding-assignment.g2crowd.com/'


class TeamList extends Component{
	constructor(){
		super()
		this.state = {team_members:[],
			voting: new Map(),
			user:null,
			userVotes:[]
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
		if(firebase.auth().currentUser !== null){
			this.setState({...this.state, voting:voting, user:firebase.auth().currentUser.uid})
		}
		firebase.database().ref('/users/'+ this.state.user+'/votes').on('value',(snapshot)=>{
			if(snapshot.val() !== null){
				let temp = Object.values(snapshot.val())
				let correctItem = []
				temp.forEach( item =>{
					correctItem.push(item.team_member)
				})
				this.setState({...this.state, userVotes:snapshot.val()})
				
			}else{
				this.setState({...this.state, userVotes:[]})
			}
		})

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
		firebase.database().ref('/users/'+this.state.user + '/votes/').push({team_member})
		this.updateVotes()
	}


	async componentDidMount(){
		try{
			setInterval(async ()=>{
				axios.get(url).then((response) =>{
					this.getVotes()
					this.setState({...this.state,team_members: response.data})
				})
				const {team_members, voting} = this.state
				team_members.forEach((team_member) =>{
					if(voting.get(team_member.name)=== undefined){
						voting.set(team_member.name,0)
					}
				})
				this.setState({...this.state, voting:voting})

				if(firebase.auth().currentUser !== null){
					this.setState({...this.state, voting:voting, user:firebase.auth().currentUser.uid})
				}
				firebase.database().ref('/users/'+ this.state.user+'/votes').on('value',(snapshot)=>{
		
					if(snapshot.val() !== null){
						let temp = Object.values(snapshot.val())
						let correctItem = []
						temp.forEach( item =>{
							correctItem.push(item.team_member)
						})
						this.setState({...this.state, userVotes:correctItem})
						
					}else{
						this.setState({...this.state, userVotes:[]})
					}
				})
				
			},1000)
		}catch(e){
			console.log(e)
		}
	}

	renderTeamMembers(){
		
		return this.state.team_members.map((team_member, index)=>{
			if(this.state.userVotes !== undefined){
				for(let i =0; i < this.state.userVotes.length; i++){
					if(this.state.userVotes[i].name === team_member.name){
						return (<MemberDetail key = {index} team_member ={team_member} vote = {this.state.voting.get(team_member.name)} isSelected ={true} onClick = {this.onClick.bind(this,team_member)}></MemberDetail>)
					}
				}
			}
			
			return (<MemberDetail key = {index} team_member ={team_member} vote = {this.state.voting.get(team_member.name)} isSelected ={false} onClick = {this.onClick.bind(this,team_member)}></MemberDetail>)
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