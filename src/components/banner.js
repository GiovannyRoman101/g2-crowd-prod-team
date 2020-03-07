import React from 'react'

const Banner = () =>{
    return (
    	<div>
			<h1 style = {styles.bannerTextStyle}>G2 Crowd Team Roster</h1>
		</div>
    )
}

const styles = {
	bannerTextStyle: {
		fontSize : 30,
		color:'tomato',
		textAlign: 'left',
		marginLeft: '2%',
		marginRight: '2%',
		borderBottom: '1px solid grey'

	}
}

export default Banner