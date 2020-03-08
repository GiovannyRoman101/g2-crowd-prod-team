import React, { Component } from 'react'
import firebase from 'firebase'

class LoginForm extends Component{

	constructor(){
		super()
		this.state ={
			email:'',
			password:'',
			user:null
		}
	}
	
	loginUser(email,password){
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => {
				this.setState({...this.state, user: user})
			
				this.props.history.push(`user/${firebase.auth().currentUser.uid}`)
			}).catch(() =>{
				firebase.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
					this.props.history.push(`user/${firebase.auth().currentUser.uid}`)
					this.setState({...this.state, user: user})
				}).catch(()=>{
					//display error message
				})
			})
			
	}

	onEmailChange(event){
		
		this.setState({...this.state, email:event.target.value})
	}
	onPasswordChange(event){
		this.setState({...this.state, password:event.target.value})
	}
	toggleButton(){
		if(this.state.user === null){
			return (<button onClick= {this.onSubmit.bind(this)} >Submit</button>)
		}else{
			return (<span>Loading ...</span>)
		}
	}
	onSubmit(){
		const {email,password} = this.state
		this.loginUser(email,password)
	}

	// renderError(){
	// 	if(this.props.errmsg){
	// 		return(
	// 			<View style ={{backgroundColor:'white'}}>
	// 				<Text style = {styles.errorTextStyle}>
	// 					{this.props.errmsg}
	// 				</Text>
	// 			</View>
	// 		)
	// 	}
	// }

	render(){
		const {inputContainer} =styles
		return(
			<div style = {inputContainer}>
				<h3>Create an account or sign in. </h3>
				<label >email: 
				<input type= 'text' 
					placeholder ='abc@gmail.com'
					value = {this.state.email}
						// callback need to bind to this
					onChange ={this.onEmailChange.bind(this)}
					></input>
				</label>
				
				<label >password:
				<input type='password' 
					placeholder ='password'
					onChange ={this.onPasswordChange.bind(this)}
					value ={this.state.password}>
				</input>
				</label>
				{this.toggleButton()}
			</div>
		)
	}
}

const styles ={
	inputContainer:{
		marginLeft:'2%',
		marginBottom:'2%',
		marginTop:'2%'
	}
}
export default LoginForm