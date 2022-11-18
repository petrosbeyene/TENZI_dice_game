import React from 'react'


export default function Timer(props){
	const styles = {
		color: props.timerVal >= 10 ? '#5035FF' : 'red'
	}
	return (
		<div className="timer" style={styles}>
			<h2>{props.timerVal}</h2>
		</div>
	)
}
