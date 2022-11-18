import React, {useState, useRef, useEffect } from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Counter from "./components/Counter"
import Congrats from "./components/Congrats"
import TimerApp from "./components/Timer"

export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [rollCount, setRollCount] = useState(0)
    const [timer, setTimer] = useState('')
    const [timeOut, setTimeOut] = useState(false)
    
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRollCount(prevRollCount => prevRollCount + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRollCount(0)
            setTimeOut(false)
            clearTimer()
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

    // Creating Timer logics
    const ref = useRef(null)
    function getTimeRemaining(deadline){
		const total = Date.parse(deadline) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / 1000 / 60 / 60) % 24);
		return {
			total, hours, minutes, seconds
		};
	}

    function startTimer(deadline){
		let { total, hours, minutes, seconds }
					= getTimeRemaining(deadline);
		if (total > 0) {
			setTimer(
				(hours > 9 ? hours : '0' + hours) + ':' +
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}else if(total === 0){
            setTimeOut(true)
        }
	}

    function clearTimer(){
		setTimer('00:00:60');

        let deadline = new Date()
        deadline.setSeconds(deadline.getSeconds() + 60)

		if (ref.current) clearInterval(ref.current);
		const id = setInterval(() => {
			startTimer(deadline);
		}, 1000)
		ref.current = id;
	}

    useEffect(() => {
		clearTimer();
	}, []);

	
	function resetGame(){
        setTenzies(false)
        setDice(allNewDice())
        setRollCount(0)
        setTimeOut(false)
		clearTimer();  
	}
    
    return (
        timeOut ? <Congrats newGame={resetGame} value={"You Lose!"} timeOut={timeOut}/> : 
        tenzies ? <Congrats newGame={rollDice} value={"You win!"} timeOut={timeOut}/> :
        <div className="main-window">
            <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div>
                <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                    Roll
                </button>
                <button 
                    className="roll-dice" 
                    onClick={resetGame}
                >
                    Start Again
                </button>
            </div>
            </main>
            <div>
                <Counter title={"Number of rolls"} rollCount= {rollCount}/>
                <TimerApp timerVal={timer}/>
            </div>
        </div>
        
    )
}