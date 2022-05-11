import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Die from "../components/Die";
import styles from "../styles/Game.module.scss";

const Game: NextPage = () => {

    const playerCount = 2
    
    const [roll, setRoll] = useState(0)
    const [turn, setTurn] = useState(0)
    const [turnNumber, setTurnNumber] = useState(1)
    const [over, setOver] = useState(false)
    const [scores, setScores] = useState(new Array(playerCount).fill(0))
    const [gained, setGained] = useState(0)

    return (
        <div className={styles.container}>
            <Head>
                <title>Game</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <h1>Player {turn + 1}'s Turn</h1>
            <h2>Turn {turnNumber}</h2>
            <h2>Current Score: {scores[turn]}</h2>
            <Die roll={roll} />
            <a className={over ? styles.over : styles.button} onClick={() => {
                if(over) return

                const newRoll = Math.floor(Math.random() * 6) + 1
                setRoll(newRoll)
                
                if(newRoll == 4) {
                    let fixScores = [...scores]
                    fixScores[turn] = scores[turn] - gained
                    setScores(fixScores)
                    
                    setOver(true)
                }
                else {
                    let newScores = [...scores]
                    newScores[turn] = scores[turn] + newRoll
                    setGained(gained + newRoll)

                    setScores(newScores)
                }
            }}>Roll</a>
            <a className={styles.button} onClick={() => {
                turn == playerCount - 1 ? (setTurn(0), setTurnNumber(turnNumber + 1)) : setTurn(turn + 1)
                
                setRoll(0)
                setOver(false)
                setGained(0)
            }}>Next Turn</a>
            <h2 className={over ? styles.pig : styles.hidden}>Greedy Pig!</h2>
        </div>
    )
}

export default Game