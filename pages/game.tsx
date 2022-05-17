import { NextPage } from "next";
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

    const playerCount = 4

    // Constant
    const [players, setPlayers] = useState(() => {
        let players: Player[] = []
        for(let i = 0; i < playerCount; i++) players.push(new Player(i, 0))

        return players
    })

    // Round Based
    const [roll, setRoll] = useState(0)
    const [playerTurn, setPlayerTurn] = useState(0)
    const [round, setRound] = useState(1)

    // Game State
    const [roundOver, setRoundOver] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)

    // Temp
    const [roundGain, setRoundGain] = useState(0)

    const newRoll = (currentGain: number) => {
        const newRoll = Math.floor(Math.random() * 6) + 1
        setRoll(newRoll)
        setRoundGain(currentGain + newRoll)

        return newRoll
    }

    const nextTurn = (currentPlayers: Player[]) => {
        if(playerTurn == mostPlaying(currentPlayers)) {
            let nRoll = newRoll(roundGain)

            if(nRoll == 4) {
                let newPlayers = [...currentPlayers]
                for(let player of newPlayers)
                    if(player.playing) player.score -= roundGain
                
                setPlayers(newPlayers)
                setRoundOver(true)
            }
        }

        let newTurn = playerTurn + 1

        while(newTurn == currentPlayers.length || !currentPlayers[newTurn].playing) {
            if(newTurn == currentPlayers.length) newTurn = 0

            if(currentPlayers[newTurn].playing) break
            
            newTurn++
        }

        if(newTurn >= playerCount) newTurn = 0
        
        setPlayerTurn(newTurn)
    }

    // Util
    const mostPlaying = (currentPlayers: Player[]) => {
        for(let i = currentPlayers.length - 1; i >= 0 ; i--)
            if(currentPlayers[i].playing) return currentPlayers[i].id

        return undefined
    }

    const anyPlaying = (p: Player[]) => {
        let any = false;
        for(let player of p) 
            if(player.playing) {
                any = true
                break
            }

        return any
    }
    
    return (
        <div className={styles.container}>
            <h1>Round {round}</h1>
            <Die roll={roll} />
            
            <div className={styles.scoreboard}>
                {players.map(player => {
                    return <h2 key={player.id}>Player {player.id + 1}: {player.score} ({player.playing ? "Playing" : "Not Playing"})</h2>
                })}
            </div>
            
            {gameStarted ? 
                roundOver ? (
                    <div>
                        <a className={styles.button} onClick={() => {
                            let newPlayers = [...players]
                            for(let p of newPlayers)
                                if(!p.playing) p.playing = true

                            setPlayers(newPlayers)
                            setRoundGain(0)
                            setRoundOver(false)
                            setRound(round + 1)
                            setPlayerTurn(0)
                            newRoll(0)
                        }}>Next Round</a>
                    </div>
                ) : (
                    <div>
                        <h1>Player {playerTurn + 1}'s Turn</h1>
                        <a className={styles.button} onClick={() => {
                            let newPlayers = [...players]
                            newPlayers[playerTurn].score += roll

                            setPlayers(newPlayers)
                            
                            nextTurn(newPlayers)
                        }}>Keep Playing</a>

                        <a className={styles.button} onClick={() => {
                            let newPlayers = [...players]
                            newPlayers[playerTurn].playing = false
                            
                            if(!anyPlaying(newPlayers)) {
                                setRoundOver(true)
                            } else {
                                nextTurn(newPlayers)
                            }
                            setPlayers(newPlayers)
                        }}>Drop Out</a>
                    </div>
                ) : (
                    <div>
                        <a className={styles.button} onClick={() => {
                            setGameStarted(true)
                            newRoll(0)
                        }}>Start Game</a>
                    </div>
                )
            }            
        </div>
    )
}

export default Game