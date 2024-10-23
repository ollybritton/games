import TicTacToe from "./games/tic-tac-toe/TicTacToe";
import Nim from "./games/nim/Nim";

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
    }
]