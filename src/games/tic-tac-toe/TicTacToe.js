import { Client } from 'boardgame.io/react';
import { Debug } from 'boardgame.io/debug'

import { Game } from './Game';
import { Board, BoardFull } from './Board';

export const TicTacToe = Client({
    game: Game,
    board: Board,

    debug: {
        impl: Debug,
        collapseOnLoad: true,
    }
});

export const TicTacToeFull = Client({
    game: Game,
    board: BoardFull,

    debug: {
        impl: Debug,
        collapseOnLoad: true,
    }
});