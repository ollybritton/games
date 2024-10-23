import {Link} from "react-router-dom"

import TicTacToe from "./games/tic-tac-toe/TicTacToe";
import Nim from "./games/nim/Nim";
import ColourfulNim from "./games/colourful-nim/ColourfulNim"
import { useLoaderData } from "react-router-dom";

export const GAMES = [
    {
        name: "Tic-Tac-Toe",
        slug: "tic-tac-toe",  // Becomes URL
        element: <TicTacToe />,
        description: "Take turns placing Xs and Os in a grid until someone gets 3-in-a-row."
    },
    {
        name: "Nim",
        slug: "nim",
        element: <Nim />,
        description: "Take turns removing (nimming) stones from piles, the last person to take a stone wins."
    },
    {
        name: "Colourful Nim",
        slug: "colourful-nim",
        element: <ColourfulNim />,
        description: "Take turns removing (nimming) stones from piles, as long as all the stones are the same colour."
    }
]

export async function loader({ params }) {
    const game = GAMES.filter(g => g.slug == params.gameSlug)[0];
    return { game }
}

export function GameDetail() {
    const { game } = useLoaderData();

    return (
        <>
            <h1>{game.name} (<Link to="/">← back</Link>)</h1>
            <i>{game.description}</i>
            <hr />
            {game.element}
        </>
    )
}