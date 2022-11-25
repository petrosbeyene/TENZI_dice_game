import React from "react";
import diceLogo from "../images/dice.png"

export default function LandingPage(props){
    return (
        <div className="landingPg">
            <div className="welcome">
                <img src={diceLogo} alt="dice logo"/>
                <h1>Welcome to tenzies game</h1>
                <img src={diceLogo} alt="dice logo"/>
            </div>
            <div className="gm_objective">
                <h2>Game Objective:</h2>
                <p>The objective of this game is to simply roll all the dice to the same number
                    with the least time and number of rolls.
                </p>
            </div>
            <button onClick={props.onclick} className="roll-dice">playNow</button>
        </div>
    )
}