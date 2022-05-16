import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Die from "../components/Die";
import styles from "../styles/Game.module.scss";

class Player {
    id: number
    score: number
    playing: boolean


    constructor(id: number, score: number) {
        this.id = id
        this.score = score
        this.playing = true
    }
}

const Game: NextPage = () => {

    const playerCount = 2

    const [players, setPlayers] = useState(() => {
        let players: Player[] = []
        for(let i = 0; i < playerCount; i++) players.push(new Player(i, 0))

        return players
    })
    
    const [roll, setRoll] = useState(0)
    const [turn, setTurn] = useState(0)
    const [turnNumber, setTurnNumber] = useState(1)
    const [over, setOver] = useState(false)
    const [gained, setGained] = useState(0)
    const [started, setStarted] = useState(false)

    const anyPlaying = () => {
        let any = false

        for(const player of players) if(player.playing) any = true

        return any
    }

    const nextTurn = () => {
        if(!anyPlaying) {
            setOver(true)
            return
        }

        let newTurn = turn + 1
        while(players[newTurn] == undefined || !players[newTurn].playing) {
            if(newTurn >= playerCount) newTurn = 0
            else newTurn += 1
        }
        
        setTurn(newTurn)
    }

    const nextRoll = () => {
        const newRoll = Math.floor(Math.random() * 6) + 1
        setRoll(newRoll)
        
        if(newRoll == 4) {
            let newPlayers = [...players]
            for(let player of newPlayers) {
                if(!player.playing) return

                player.score -= gained
            }
            
            setPlayers(newPlayers)
            setOver(true)
        }
        else {
            let newPlayers = [...players]
            for(let player of newPlayers) {
                if(!player.playing) return

                player.score += newRoll
            }

            setPlayers(newPlayers)
            setGained(gained + newRoll)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Game</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.scoreboard}>
                <h2>Scores:</h2>
                {players.map(player => {
                    return <h3>Player {player.id + 1}: {player.score}</h3>
                })}
            </div>
            
            <h1>Player {turn + 1}'s Turn</h1>
            <h2>Turn {turnNumber}</h2>
            
            <Die roll={roll} />

            <a className={started ? styles.hidden : styles.button} onClick={() => {
                nextRoll()
                setStarted(true)
            }}>Start Game</a>

            {/* <a className={started ? over ? styles.over : styles.button : styles.hidden} onClick={() => {
                if(over) return

                nextRoll()

                
            }}>Roll</a> */}

            <a className={started ? over ? styles.hidden : styles.button : styles.hidden } onClick={() => {
                // if(over) return

                nextTurn()
            }}>Keep Playing</a>


            <a className={started ? over ? styles.hidden : styles.button : styles.hidden } onClick={() => {
                // if(over) return
                let newPlayers = [...players]
                newPlayers[turn].playing = false

                setPlayers(newPlayers)
                nextTurn()
            }}>Stop Playing</a>
            <a className={over ? styles.button : styles.hidden} onClick={() => {
                nextRoll()
                setOver(false)
                setGained(0)
            }}>Next Turn</a>
            <h2 className={over ? styles.pig : styles.hidden}>Greedy Pig!</h2>
        </div>
    )
}

export default Game