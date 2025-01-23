import {Link} from "react-router-dom"
import { useLoaderData } from "react-router-dom";

import { TicTacToe, TicTacToeFull } from "./games/tic-tac-toe/TicTacToe";
import { Nim, NimFull } from "./games/nim/Nim";
import { ColourfulNim, ColourfulNimFull } from "./games/colourful-nim/ColourfulNim"
import { SkiJumps, SkiJumpsFull } from "./games/ski-jumps/SkiJumps";
import { BeggarMyNeighbour, BeggarMyNeighbourFull } from "./games/beggar-my-neighbour/BeggarMyNeighbour";

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
    },
    {
        name: "Ski Jumps",
        slug: "ski-jumps",
        description: "Simple game described in Chapter 1 of Winning Ways.",

        element: <SkiJumps />,
        full: <SkiJumpsFull />,
    },
    {
        name: "Beggar-my-neighbour",
        slug: "beggar-my-neighbour",
        description: "A luck-based two-player card game at the centre of a famous problem.",

        element: <BeggarMyNeighbour />,
        full: <BeggarMyNeighbourFull />,
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