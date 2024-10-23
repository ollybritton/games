export const Game = {
    setup: ({random}) => {
        let numPiles = random.Die(6);
        let piles = [];

        for (let i = 0; i < numPiles; i++) {
            let numSections = random.Die(4);
            let sections = random.Die(3, numSections);
            
            piles.push(sections);
        }

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
        clickPile: ({ G, playerID }, index, sectionIndex, removeAmount) => {
            let pile = G.piles[index];

            pile[sectionIndex] -= removeAmount;
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
    return piles.every(pile => pile.every(section => section == 0));
}