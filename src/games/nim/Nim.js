import { Client } from 'boardgame.io/react';
import { Debug } from 'boardgame.io/debug'

import { Game } from './Game';
import { Board, BoardFull } from './Board';

export const Nim = Client({
    game: Game,
    board: Board,

    debug: {
        impl: Debug,
        collapseOnLoad: true,
    }
});

export const NimFull = Client({
    game: Game,
    board: BoardFull,

    debug: {
        impl: Debug,
        collapseOnLoad: true,
    }
});