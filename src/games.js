import TicTacToe from "./games/tic-tac-toe/TicTacToe";
import Nim from "./games/nim/Nim";
import ColourfulNim from "./games/colourful-nim/ColourfulNim"

export const GAMES = [
    {
        name: "Tic-Tac-Toe",
        slug: "tic-tac-toe",  // Becomes URL
        element: <TicTacToe />
    },
    {
        name: "Nim",
        slug: "nim",
        element: <Nim />
    },
    {
        name: "Colourful Nim",
        slug: "colourful-nim",
        element: <ColourfulNim />,
    }
]