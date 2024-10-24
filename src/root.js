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
                This website implements some of the combinatorial games found in&nbsp;
                <a href="https://ollybritton.com/notes/books/on-numbers-and-games/">On Numbers and Games</a>
                &nbsp;and&nbsp;
                <a href="https://ollybritton.com/notes/textbooks/winning-ways-for-your-mathematical-plays/">Winning Ways for Your Mathematical Plays</a>.
            </p>

            <ul>
                {games}
            </ul>
        </>
    )
}