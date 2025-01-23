import { Link, Outlet, useMatch } from "react-router-dom"
import { GAMES } from "./games"

export default function Root() {
    const isGame = useMatch(":gameSlug")

    if (isGame) {
        return <Outlet />
    }

    let games = GAMES.map(game => (
        <li key={game.slug}><Link to={game.slug}>{game.name}</Link></li>
    ))

    return (
        <>
            <h1>Games</h1>
            <hr />
            <p>
                This website implements a few games, including some of the combinatorial games found in&nbsp;
                <a href="https://ollybritton.com/notes/books/on-numbers-and-games/">On Numbers and Games</a>
                &nbsp;and&nbsp;
                <a href="https://ollybritton.com/notes/textbooks/winning-ways-for-your-mathematical-plays/">Winning Ways for Your Mathematical Plays</a>.
                These are primarily <i>mathematical games</i>; the most of the enjoyment comes from analysing them rather than playing them.
            </p>

            <ul>
                {games}
            </ul>
        </>
    )
}