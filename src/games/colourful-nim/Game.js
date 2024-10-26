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

    ai: {
        enumerate: (G, ctx) => {
            let moves = [];

            for (let i = 0; i < G.piles.length; i++) {
                for (let sectionIndex = G.piles[i].length - 1; sectionIndex >= 0; sectionIndex--) {
                    let pile = G.piles[i][sectionIndex]

                    if (pile > 0) {
                        for (let removeAmount = 1; removeAmount <= pile; removeAmount++) {
                            moves.push({
                                move: 'clickPile',
                                args: [i, sectionIndex, removeAmount],
                            })
                        }

                        break;
                    }
                }
            }

            return moves;
        }
    }
};

function IsVictory(piles) {
    return piles.every(pile => pile.every(section => section === 0));
}