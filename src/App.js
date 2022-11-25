import React, {useState} from "react";
import LandingPage from "./pages/LandingPage";
import PlayingPage from "./pages/PlayingPage";

export default function App(){
    const [playNow, setPlayNow] = useState(false)
    function play(){
        setPlayNow(prevValue => !prevValue)
    }
    return(
        playNow ?  <PlayingPage />:<LandingPage onclick = {play}/>
    )
}