import {Link} from "react-router-dom"

import { TicTacToe, TicTacToeFull } from "./games/tic-tac-toe/TicTacToe";
import { Nim, NimFull } from "./games/nim/Nim";
import { ColourfulNim, ColourfulNimFull } from "./games/colourful-nim/ColourfulNim"
import { useLoaderData } from "react-router-dom";

export const GAMES = [
    {
        name: "Tic-Tac-Toe",
        slug: "tic-tac-toe",  // Becomes URL
        description: "Take turns placing Xs and Os in a grid until someone gets 3-in-a-row.",

        element: <TicTacToe />,
        full: <TicTacToeFull />,
    },
    {
        name: "Nim",
        slug: "nim",
        description: "Take turns removing (nimming) stones from piles, the last person to take a stone wins.",

        element: <Nim />,
        full: <NimFull />,
    },
    {
        name: "Colourful Nim",
        slug: "colourful-nim",
        description: "Take turns removing (nimming) stones from piles, as long as all the stones are the same colour.",

        element: <ColourfulNim />,
        full: <ColourfulNimFull />,
    }
]

export async function loader({ params }) {
    const game = GAMES.filter(g => g.slug === params.gameSlug)[0];
    return { game }
}

export function GameDetail() {
    const { game } = useLoaderData();

    return (
        <>
            <h1>{game.name} (<Link to="/">← back</Link>)</h1>
            <i>{game.description}</i>
            <hr />
            {game.full}
        </>
    )
}