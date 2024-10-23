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
                initialPile={G.initialPiles[i]}
                pile={G.piles[i]}
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

function Pile({index, initialPile, pile, clickPile}) {
    let stones = [];

    for (let sectionIndex = initialPile.length - 1; sectionIndex >= 0; sectionIndex--) {
        let currentSectionSize = pile[sectionIndex]; // Might be zero
        let initialSectionSize = initialPile[sectionIndex];

        let isTop = pile.slice(sectionIndex+1).every(x => x == 0);
        let colour = sectionIndex % 2 == 0 ? "red" : "yellow"

        for (let i = initialSectionSize - 1; i >= 0; i--) {
            if (i < currentSectionSize) {
                if (isTop) {
                    stones.push(<div className={"stone top " + colour} onClick={() => clickPile(index, sectionIndex, currentSectionSize - i)} />)
                } else {
                    stones.push(<div className={"stone " + colour} />)
                }
            } else {
                stones.push(<div className="clicked-stone" />)
            }
        }
    }

    return (
        <div className="pile">{stones}</div>
    )
}