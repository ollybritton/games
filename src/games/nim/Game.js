import { INVALID_MOVE } from "boardgame.io/core";

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
};

// Return true if `cells` is in a winning configuration.
function IsVictory(piles) {
    return piles.every(pile => pile == 0);
}