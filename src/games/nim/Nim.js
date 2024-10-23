import { Client } from 'boardgame.io/react';
import { Game } from './Game';
import { Board } from './Board';

const Nim = Client({
    game: Game,
    board: Board,
});

export default Nim;