import React from "react";
import Confetti from "react-confetti";

export default function Congrats(props){
    return (
        <div className="congra">
            {!props.timeOut && <Confetti />}
            <h1>{props.value}</h1>
            <h4>Score: </h4>
            <button className="roll-dice" onClick={props.newGame}>New Game</button>
        </div>
    )
}