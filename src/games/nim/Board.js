import React from 'react';

import styles from "./styles.module.css"

export function Board({ ctx, G, moves }) {
    let piles = [];

    for (let i = 0; i < G.piles.length; i++) {
        piles.push(
            <Pile
                key={i}
                index={i}
                initialSize={G.initialPiles[i]}
                size={G.piles[i]}
                clickPile={moves.clickPile}
            />
        );
    }

    return <div className={styles.board}>{piles}</div>
}

function Pile({index, initialSize, size, clickPile}) {
    let stones = [];

    for (let i = initialSize-1; i >= 0; i--) {
        if (i < size) {
            stones.push(<div className={styles.stone} key={i} onClick={() => clickPile(index, size - i)} />)
        } else {
            stones.push(<div className={styles["clicked-stone"]} key={i} />)
        }
    }

    return (
        <div className={styles.pile}>{stones}</div>
    )
}

export function BoardFull({ ctx, G, moves }) {
    let subtitle = '';

    if (ctx.gameover) {
        subtitle = <div id="winner">Winner: {ctx.gameover.winner === "0" ? "L" : "R"}</div>
    } else {
        subtitle = <div id="to-move">To move: {ctx.currentPlayer === "0" ? "L" : "R"}</div>
    }

    return (
        <div>
            <Board ctx={ctx} G={G} moves={moves} />
            <hr />
            {subtitle}
        </div>
    );
}