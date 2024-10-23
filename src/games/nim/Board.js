import React from 'react';

import "./styles.css"

export function Board({ ctx, G, moves }) {
    const onClick = (index, removeAmount) => moves.clickPile(index, removeAmount);

    let subtitle = '';

    if (ctx.gameover) {
        subtitle = <div id="winner">Winner: {ctx.gameover.winner}</div>
    } else {
        subtitle = <div id="to-move">To move: {ctx.currentPlayer}</div>
    }
    
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
    
    return (
        <div>
            <div className="board">{piles}</div>
            <hr />
            {subtitle}
        </div>
    );
}

function Pile({index, initialSize, size, clickPile}) {
    let stones = [];

    for (let i = initialSize-1; i >= 0; i--) {
        if (i < size) {
            stones.push(<div className="stone" key={i} onClick={() => clickPile(index, size - i)} />)
        } else {
            stones.push(<div className="clicked-stone" key={i} />)
        }
    }

    return (
        <div className="pile">{stones}</div>
    )
}