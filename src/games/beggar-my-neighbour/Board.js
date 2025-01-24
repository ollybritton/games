import React from 'react';

import styles from "./styles.module.css"

import { ToStringRepr } from './Game';

export function Board({ ctx, G, moves }) {
    let player1Rep = (G.deck0.length == 0) ? "(empty)" : ToStringRepr(G.deck0)
    let middleRep = (G.middle.length == 0) ? "(empty)" : ToStringRepr(G.middle)
    let player2Rep = (G.deck1.length == 0) ? "(empty)" : ToStringRepr(G.deck1)

    let player1Image = (G.deck0.length == 0) ? "" : getImageURL("back")
    let player2Image = (G.deck1.length == 0) ? "" : getImageURL("back")

    let debtMsg = (G.debt == 0) ? "" : `Left to pay: ${G.debt * Math.sign(G.debt)}`

    return <div>
        <div className={styles.table}>
            <div className={styles.container}>
                <img src={player1Image} className={styles.deck + " " + styles.player + " " + (ctx.currentPlayer === "0" ? "" : styles.deactivated)} onClick={() => moves.clickDeck("0")} />
                <pre>Player 1: {player1Rep}</pre>
            </div>
            <div className={styles.container}>
                <img alt="" src={getImageURL(G.middle[G.middle.length - 1])} className={styles.deck + " " + styles.middle} />
                <pre>Middle: {middleRep}</pre>
                <pre>&nbsp;{debtMsg}</pre>
            </div>
            <div className={styles.container}>
                <img src={player2Image} className={styles.deck + " " + styles.player + " " + (ctx.currentPlayer === "1" ? "" : styles.deactivated)} onClick={() => moves.clickDeck("1")} />
                <pre>Player 2: {player2Rep}</pre>
            </div>
        </div>
        <pre>
            Total cards: {G.totalCards}<br></br>
            Total tricks: {G.totalTricks}
        </pre>
    </div>
}

export function BoardFull({ ctx, G, moves }) {
    let subtitle = '';

    if (ctx.gameover) {
        subtitle = <div id="winner">Winner: {ctx.gameover.winner === "0" ? "Player 1" : "Player 2"}</div>
    } else {
        subtitle = <div id="to-move">To move: {ctx.currentPlayer === "0" ? "Player 1" : "Player 2"}</div>
    }

    return (
        <div>
            <Board ctx={ctx} G={G} moves={moves} />
            <hr />
            <p>{subtitle}</p>
            <p>Refresh for a different deal.</p>
        </div>
    )
}

function getImageURL(card) {
    return `${process.env.PUBLIC_URL}/assets/beggar-my-neighbour/cards/${card}.png`
}