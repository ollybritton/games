import React from 'react';

import styles from "./styles.module.css"

export function Board({ ctx, G, moves }) {
    const onClick = (id) => moves.clickCell(id);


    
    let tbody = [];
    for (let i = 0; i < 3; i++) {
        let cells = [];
        for (let j = 0; j < 3; j++) {
            const id = 3 * i + j;
            cells.push(
                <td key={id}>
                    {G.cells[id] ? (
                        <div className={styles.cell}>{G.cells[id] === "0" ? "X" : "O"}</div>
                    ) : (
                        <div className={styles.cell} onClick={() => onClick(id)} />
                    )}
                </td>
            );
        }
        tbody.push(<tr key={i}>{cells}</tr>);
    }
    
    return (
        <table className={ctx.gameover ? styles.gameOver : ""}>
            <tbody>{tbody}</tbody>
        </table>
    );
}

export function BoardFull({ctx, G, moves}) {
    let infoText = '';

    if (ctx.gameover) {
        if (ctx.gameover.winner !== undefined) {
            infoText = <div id="winner">Winner: {ctx.gameover.winner === "0" ? "X" : "O"}</div>
        } else {
            infoText = <div id="winner">Draw!</div>
        }
    } else {
        infoText = `To move: ${ctx.currentPlayer === "0" ? "X" : "O"}`
    }

    return <div>
        <Board ctx={ctx} G={G} moves={moves} />
        <p>{infoText}</p>
    </div>
}