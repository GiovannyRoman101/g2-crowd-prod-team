import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Banner from './components/banner.js'
import TeamList from './components/team_list.js'
import FireBaseConfig from './firebase_config.js'


class App extends Component{
	componentDidMount(){
		FireBaseConfig()
	}

	render(){
		return (
			<div style = {styles.votingBorderStyle}>
				<Banner></Banner>
				<TeamList></TeamList>
			</div>
		)
	}
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
ReactDOM.render(<App/>, document.getElementById('root'));


