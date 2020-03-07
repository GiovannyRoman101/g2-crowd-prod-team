import React from 'react'

const MemberDetail =({team_member,vote, onClick})=>{
	const {name, image_url, title, bio} = team_member
	const {detailContainerStyle,pictureContainerStyle,pictureStyle,
		textContainerStyle,nameStyle, titleStyle, votingStyle, votingInfoStyle } = styles
	return (
		<div style = {detailContainerStyle}>
			<div style ={pictureContainerStyle}>
				<img style = {pictureStyle}src = {image_url} alt =''>
				</img>
			</div>
			<div style = {textContainerStyle}>
				<p style = {nameStyle}>{name}</p>
				<p style = {titleStyle}>{title}</p>
				<p>{bio}</p>
				<p style = {votingInfoStyle}>want to work with {name}?  <button onClick= {onClick} >Yes!</button></p>
				<p> <p style= {votingStyle}>{vote}</p> people have said Yes!</p>
			</div>
		</div>
	)
}

const styles ={
	pictureContainerStyle:{
		height:'auto',
		weight: '30px',
		marginLeft:'2%',
		marginBottom:'2%',
		marginTop:'2%'
	},
	pictureStyle:{
		height:'200px',
		weight:'200px'
	},
	nameStyle:{
		fontSize:'20px',
		
		fontWeight:'bold'
	},
	titleStyle:{
		fontSize:'18px',
		textDecoration: 'underline'
	},
	textContainerStyle:{
		height:'auto',
		marginLeft:'2%',
		marginBottom:'2%'
	},
	detailContainerStyle:{
		borderBottom: '1px solid grey',
		marginLeft:'2%',
		marginRight:'2%',
		display: 'flex',
		alignItems:'center'
	},
	votingInfoStyle:{
		
		fontWeight:'bold'
	}
	,
	votingStyle:{
		display:'inline-block',
		fontFamily: 'courier',
		fontWeight:'bold'
	}
}

export  default MemberDetail