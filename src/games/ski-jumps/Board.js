import {useState} from 'react';

import styles from "./styles.module.css"

import { validMoves } from './Game';

export function Board({ ctx, G, moves }) {
    const [toMove, setToMove] = useState(null);

    let potentialMoves = toMove === null ? [] : validMoves(toMove[0], toMove[1], G.rows)

    let rows = [];

    for (let i = 0; i < G.rows.length; i++) {
        let row = [];

        for (let j = 0; j < G.rows[i].length; j++) {
            let occupied = G.rows[i][j] !== null

            let isMove = potentialMoves.some(move => move[0] === i && move[1] === j)
            let isMoveClass = isMove ? styles.isMove : ""
            
            let isCurrentPlayer = G.rows[i][j] !== null && G.rows[i][j].toUpperCase() === (ctx.currentPlayer === "0" ? "L" : "R")
            let isCurrentPlayerClass = isCurrentPlayer ? styles.isCurrentPlayer : ""

            let classes = `${styles.square} ${isMoveClass} ${isCurrentPlayerClass}`

            if (occupied && isCurrentPlayer) {
                row.push(
                    <div key={i * G.rows[0].length + j} className={classes} onClick={() => setToMove([i, j])}>
                        {G.rows[i][j]}
                    </div>
                )
            } else if (occupied && !isCurrentPlayer) {
                row.push(
                    <div key={i * G.rows[0].length + j} className={classes}>
                        {G.rows[i][j]}
                    </div>
                )
            } else if (isMove) {
                row.push(
                    <div
                        key={i * G.rows[0].length + j}
                        className={classes}
                        onClick={() => {moves.moveMan(toMove[0], toMove[1], i, j); setToMove(null)}}
                    />
                )
            } else {
                row.push(
                    <div key={i * G.rows[0].length + j} className={classes} onClick={() => setToMove(null)}>

                    </div>
                )
            }
        }
        
        rows.push(
            <div key={i} className={styles.row}>{row}</div>
        )
    }

    return (
        <>
            <div className={styles.rows}>{rows}</div>
        </>
    );
}

export function BoardFull({ ctx, G, moves }) {
    let subtitle = '';

    if (ctx.gameover) {
        subtitle = <div id="winner">Winner: {ctx.gameover.winner === "0" ? "L" : "R"}</div>
    } else {
        subtitle = <div id="to-move">To move: {ctx.currentPlayer === "0" ? "L" : "R"}</div>
    }

    const classes = ctx.gameover ? styles.gameOver : ""

    return (
        <>
            <div className={classes}>
                <Board ctx={ctx} G={G} moves={moves} />
            </div>
            
            <hr />
            {subtitle}
        </>
    );
}