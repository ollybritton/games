import { Client } from 'boardgame.io/react';
import { Game } from './Game';
import { Board } from './Board';

const TicTacToe = Client({
    game: Game,
    board: Board,
});

export default TicTacToe;