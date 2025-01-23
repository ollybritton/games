import { INVALID_MOVE } from "boardgame.io/core";

const STANDARD_DECK = [
    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD',
    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
    'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS'
]  

const NON_COURT_CARDS = [
    '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H',
    '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D',
    '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C',
    '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S',
]  

export const Game = {
    setup: ({random}) => {
        let shuffled = random.Shuffle(STANDARD_DECK);

        let [deck0, deck1] = FromStringRepr(
            "---JQ---K-A----A-J-K---QK-",
            "-J-----------AJQA----K---Q",            
        )

        return {
            // deck0: shuffled.slice(0, 26),
            // deck1: shuffled.slice(26, 52),
            deck0: deck0,
            deck1: deck1,
            middle: [],
            debt: 0, // +ve if player one needs to pay up, -ve if player two does,
            totalTricks: 0,
            totalCards: 0,
        }
    },

    turn: {
        onBegin: ({ G, ctx, events }) => {
            if (G.deck0.length == 0 && ctx.currentPlayer === "0") {
                G.totalCards += 1
                G.totalTricks += 1
                return events.endGame({ winner: "1" })
            }
    
            if (G.deck1.length == 0 && ctx.currentPlayer === "1") {
                G.totalCards += 1
                G.totalTricks += 1
                return events.endGame({ winner: "0" })
            }
        }
    },

    moves: {
        clickDeck: ({G, playerID, events}, deckID) => {
            if (deckID !== playerID) {
                return INVALID_MOVE
            }

            let deck = (deckID === "0") ? G.deck0 : G.deck1;

            let popped = deck.pop();
            G.totalCards += 1;
            let val = GetValue(popped);
            G.middle.push(popped)
            
            if (val > 0) {
                G.debt = val * ((deckID === "0") ? -1 : 1)
                events.endTurn()
            } else if (G.debt !== 0) {
                G.debt += (deckID === "0") ? -1 : 1
                
                if (G.debt == 0) {
                    if(playerID === "0") {
                        G.deck1 = G.middle.reverse().concat(G.deck1)
                    } else {
                        G.deck0 = G.middle.reverse().concat(G.deck0)
                    }
                    G.middle = []
                    G.totalTricks += 1;
                    events.endTurn();
                }       
            } else {
                events.endTurn();
            }

        },
    },

    ai: {
        enumerate: (G, ctx) => {
            if ((G.deck0.length == 0 && ctx.currentPlayer === "0") || (G.deck1.length == 0 && ctx.currentPlayer === "1")) {
                return [];
            }

            return [{move: 'clickDeck', args: [ctx.currentPlayer]}];
        }
    }
};

function GetValue(cardName) {
    switch (cardName[0]) {
        case "A":
            return 4;
        case "K":
            return 3;
        case "Q":
            return 2;
        case "J":
            return 1;
        default:
            return 0;
    }
}

export function ToStringRepr(cards) {
    return cards.map(cardName => {
        switch (cardName[0]) {
            case "A":
                return "A";
            case "K":
                return "K";
            case "Q":
                return "Q";
            case "J":
                return "J";
            default:
                return "-";
        }
    }).join("");
}

function FromStringRepr(player1Rep, player2Rep) {
    let numbers = shuffle([...NON_COURT_CARDS]);
    console.log(numbers)
    let aces = shuffle(["AH", "AD", "AC", "AS"])
    let kings = shuffle(["KH", "KD", "KC", "KS"])
    let queens = shuffle(["QH", "QD", "QC", "QS"])
    let jacks = shuffle(["JH", "JD", "JC", "JS"])

    let player1Deck = [];
    let player2Deck = [];

    for (var i = 0; i < player1Rep.length; i++) {
        switch (player1Rep[i]) {
            case "-":
                player1Deck.push(numbers.pop());
                break;
            case "A":
                player1Deck.push(aces.pop());
                break;
            case "K":
                player1Deck.push(kings.pop());
                break;
            case "Q":
                player1Deck.push(queens.pop());
                break;
            case "J":
                player1Deck.push(jacks.pop());
                break;
        }
    }

    for (var i = 0; i < player2Rep.length; i++) {
        switch (player2Rep[i]) {
            case "-":
                player2Deck.push(numbers.pop());
                break;
            case "A":
                player2Deck.push(aces.pop());
                break;
            case "K":
                player2Deck.push(kings.pop());
                break;
            case "Q":
                player2Deck.push(queens.pop());
                break;
            case "J":
                player2Deck.push(jacks.pop());
                break;
        }
    }

    return [player1Deck.reverse(), player2Deck.reverse()]
}

function shuffle(array) { 
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 