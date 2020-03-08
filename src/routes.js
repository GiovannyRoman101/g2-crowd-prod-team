import React from 'react'
import {BrowserRouter,Route,Switch}from 'react-router-dom'
import App from './components/index.js'
import Banner from './components/banner.js'
import LoginForm from './components/loginform'


function Routes() {
	return (
		<div style = {styles.votingBorderStyle}>
		<BrowserRouter>
		<Banner></Banner>
		<Switch>
		<Route path= "/user/:id" exact component= {App}/>>
		<Route path= "/" exact component= {LoginForm}/>>
		</Switch>
		</BrowserRouter>
		</div>
	)
}


const styles = {
	votingBorderStyle:{
		borderStyle: 'solid',
		borderColor: 'gray',
		borderWidth: '1px',
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '75%',
		boxShadow:'0px 10px lightgray'
	}
}

export default Routes