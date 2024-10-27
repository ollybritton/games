import { INVALID_MOVE } from "boardgame.io/core";

export const Game = {
    setup: ({random}) => {
        let roll = random.Die(4)
        let rows;

        if (roll === 1) {
            rows = [
                [null, null, null, "L", null, null, null, null],
                [null, null, "R", null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ]
        } else if (roll === 2) {
            rows = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, "l", null, null, null, null],
                [null, null, null, null, null, null, null, "R"],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, "L", null],
            ]
        } else if (roll === 3) {
            rows = [
                [null, "L", null, null, null],
                [null, "R", null, null, null],
                [null, null, null, null, null],
            ]
        } else if (roll === 4) {
            rows = [
                ["L", null, null, null, null],
                [null, null, null, null, "R"],
                [null, null, null, null, null],
            ]
        }

        return { rows: rows }
    },

    turn: {
        minMoves: 1,
        maxMoves: 1,
        onBegin: ({ G, ctx, events }) => {
            if (hasNoMoves(ctx.currentPlayer, G.rows)) {
                events.endGame({ winner: ctx.currentPlayer === "0" ? "1" : "0" });
            }
        }
    },

    moves: {
        moveMan: ({ G, playerID }, oldRow, oldCol, newRow, newCol) => {
            if (G.rows[oldRow][oldCol] === null) {
                console.log("Empty initial square")
                return INVALID_MOVE
            }

            if (G.rows[newRow][newCol] !== null) {
                console.log("Non-empty destination")
                return INVALID_MOVE
            }


            let manBelongsTo = G.rows[oldRow][oldCol].toUpperCase() === "L" ? "0" : "1"

            if (!(manBelongsTo === playerID)) {
                console.log("Man doesn't belong to current player")
                return INVALID_MOVE
            }

            let moves = validMoves(oldRow, oldCol, G.rows);

            if (!moves.some(move => move[0] === newRow && move[1] === newCol)) {
                return INVALID_MOVE
            }

            if (newRow === oldRow + 2) {
                G.rows[oldRow+1][oldCol] = G.rows[oldRow+1][oldCol].toLowerCase()
            }

            G.rows[newRow][newCol] = G.rows[oldRow][oldCol]
            G.rows[oldRow][oldCol] = null
        }
    },

    ai: {
        enumerate: (G, ctx) => {
            let moves = [];

            for (let i = 0; i < G.piles.length; i++) {
                for (let removeAmount = 1; removeAmount <= G.piles[i]; removeAmount++) {
                    moves.push({
                        move: 'clickPile',
                        args: [i, removeAmount],
                    })
                }
            }

            return moves;
        }
    }
};

export function validMoves(row, col, rows) {
    let playerID = rows[row][col].toUpperCase() === "L" ? "0" : "1"
    let isJumper = rows[row][col].toUpperCase() === rows[row][col]

    let height = rows.length
    let width = rows[0].length

    let moves = [];

    // Moving left or right
    if (playerID === "0" && col !== width - 1 && rows[row][col+1] === null) {
        moves.push([row, col+1])
    }

    if (playerID === "1" && col !== 0 && rows[row][col-1] === null) {
        moves.push([row, col-1])
    }

    // Jumping
    if (row < height - 2 && rows[row+1][col] !== null && rows[row+1][col].toUpperCase() !== rows[row][col] && rows[row+2][col] === null && isJumper) {
        moves.push([row+2, col])
    }

    return moves
}

function hasNoMoves(player, rows) {
    let anyMoves = false;

    for (let i = 0; i < rows.length; i++) {
        if (anyMoves) {
            break
        }

        for (let j = 0; j < rows[i].length; j++) {
            let square = rows[i][j];

            if (square === null) {
                continue
            }

            let squarePlayer = rows[i][j].toUpperCase() === "L" ? "0" : "1"

            if (squarePlayer === player && validMoves(i, j, rows).length !== 0) {
                console.log(`square ${i}, ${j} has valid moves ${validMoves(i, j, rows)}`)
                anyMoves = true;
                break
            }
        }
    }

    return !anyMoves;
}