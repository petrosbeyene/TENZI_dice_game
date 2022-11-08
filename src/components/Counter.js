import React from "react";

export default function Counter(props){

    return (
        <div className="counter-face">
            <span>{props.title}: {props.rollCount}</span>
        </div>
    )
}