export const Game = {
    setup: ({random}) => {
        let numPiles = random.Die(6);
        let piles = random.Die(6, numPiles)
        let initialPiles = [...piles];

        return {
            piles: piles,
            initialPiles: initialPiles,
        }
    },

    turn: {
        minMoves: 1,
        maxMoves: 1,
    },

    moves: {
        clickPile: ({ G, playerID }, index, removeAmount) => {
            G.piles[index] -= removeAmount;
        },
    },

    endIf: ({ G, ctx }) => {
        if (IsVictory(G.piles)) {
            return { winner: ctx.currentPlayer };
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

function IsVictory(piles) {
    return piles.every(pile => pile === 0);
}