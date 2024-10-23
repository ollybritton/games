import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './errorPage';

import "./index.css";

import { GAMES, GameDetail, loader as gameLoader } from './games';
import Root from './root';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        // children: GAMES.map(game => ({
        //     path: `/${game.slug}`,
        //     element: game.element,
        //     errorElement: <ErrorPage />,
        // }))
        children: [
            {
                path: ":gameSlug",
                element: <GameDetail />,
                loader: gameLoader,
            }
        ]
    },
], { basename: process.env.PUBLIC_URL })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);