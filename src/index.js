import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from './errorPage';

import { GAMES } from './games';
import Root from './root';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
    },
    ...GAMES.map(game => ({
        path: `/${game.slug}`,
        element: game.element,
        errorElement: <ErrorPage />,
    }))
], { basename: process.env.PUBLIC_URL })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);