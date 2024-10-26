import { Client } from 'boardgame.io/react';
import { Debug } from 'boardgame.io/debug';

import { Game } from './Game';
import { Board, BoardFull } from './Board';

export const ColourfulNim = Client({
    game: Game,
    board: Board,

    debug: {
        impl: Debug,
        collapseOnLoad: true,
    }
});

export const ColourfulNimFull = Client({
    game: Game,
    board: BoardFull,

    debug: {
        impl: Debug,
        collapseOnLoad: true,
    }
});