import React from "react";
import Confetti from "react-confetti";

export default function Congrats(props){
    return (
        <div className="congra">
            {!props.timeOut && <Confetti />}
            <h1>{props.value}</h1>
            <h2>Score: {props.calcScore}</h2>
            <button className="roll-dice" onClick={props.newGame}>New Game</button>
        </div>
    )
}