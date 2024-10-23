# `games`

Implementations of some of the combinatorial games found in [On Numbers and Games](https://ollybritton.com/notes/books/on-numbers-and-games/) and [Winning Ways for Your Mathematical Plays](https://ollybritton.com/notes/textbooks/winning-ways-for-your-mathematical-plays/) using [boardgame.io](https://boardgame.io/).

Play them [online here](https://projects.ollybritton.com/games).

## Games
- Nim
- Tic-Tac-Toe

## Adding a game
- Create folder in `src/games/`
- Add entry to `src/games.js`
- Add to the README

## To-do?
The ultimate goal would be to implement every game in ONAG and WW, since these are hard to find online. It would be useful to be able to try each game as your read about it, without having to set up a physical board. Games might include:

- Variations of Nim
    - Colourful Nim
    - Rims
    - Dims
    - Prims
- Grundy's game
- Northcott's game
- Kayles
- Diminishing Rectangles
- Traffic Jams
- Hackenbush
    - Green
    - Blue-Red
    - Blue-Red-Green
- Dots and Boxes

It would also be nice to perform operations on these games, where relevant:

- Taking the sum of two games
- Computing outcome classes
- Computing Grundy values for impartial games
- Converting a game to its misère variant

And it would also be nice to build up a reference on each which describes winning strategies and lists outcome classes. For example, as far as I can tell it is difficult to find out online whether Grundy's game with a pile of size 15 is a win or a lose under misère play.